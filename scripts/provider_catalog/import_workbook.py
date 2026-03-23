#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import math
import re
import shutil
from collections import Counter
from pathlib import Path
from typing import Any

import pandas as pd


SCHEMA_VERSION = 1
ROOT = Path(__file__).resolve().parents[2]
DATA_DIR = ROOT / "data" / "provider-catalog"
PROVIDERS_DIR = DATA_DIR / "providers"
REPORTS_DIR = DATA_DIR / "reports"

SUPPORT_MAP = {
    "✓": "native",
    "✗": "unsupported",
    "~": "partial",
}

PROTOCOL_PATTERNS = {
    "rest": "rest",
    "sse": "sse",
    "websocket": "websocket",
    "webrtc": "webrtc",
    "grpc": "grpc",
    "sip": "sip",
}

MARKDOWN_PROVIDER_ALIASES = {
    "google": "Google (Vertex / AI Studio)",
    "nvidia nim": "NVIDIA (NIM)",
    "ibm watsonx": "IBM (watsonx)",
    "alibaba/qwen dashscope": "Alibaba / Qwen (DashScope)",
    "zhipu ai / z.ai": "Z.ai / Zhipu AI",
    "baidu ernie/qianfan": "Baidu (ERNIE / Qianfan)",
    "bytedance doubao/seed": "ByteDance (Doubao/Seed)",
    "moonshot ai / kimi": "Moonshot AI (Kimi)",
    "lemonfox.ai": "Lemonfox.ai",
    "murf.ai": "Murf.ai",
    "neets.ai": "Neets.ai",
    "openai": "OpenAI",
    "anthropic": "Anthropic",
    "groq": "Groq",
    "mistral ai": "Mistral AI",
    "cohere": "Cohere",
    "deepseek": "DeepSeek",
    "xai": "xAI",
    "microsoft azure": "Microsoft Azure",
    "amazon aws": "Amazon AWS",
    "ai21 labs": "AI21 Labs",
    "perplexity": "Perplexity",
    "reka": "Reka",
    "aleph alpha": "Aleph Alpha",
    "minimax": "MiniMax",
    "stepfun": "StepFun",
    "baichuan": "Baichuan",
    "01.ai / yi": "01.AI (Yi)",
    "xiaomi mimo": "Xiaomi (MiMo)",
    "together ai": "Together AI",
    "fireworks ai": "Fireworks AI",
    "deepinfra": "DeepInfra",
    "cerebras": "Cerebras",
    "sambanova": "SambaNova",
    "replicate": "Replicate",
    "hugging face inference api": "Hugging Face (Inference API)",
    "siliconflow": "SiliconFlow",
    "novita ai": "Novita AI",
    "lepton ai": "Lepton AI",
    "hyperbolic": "Hyperbolic",
    "elevenlabs": "ElevenLabs",
    "deepgram": "Deepgram",
    "assemblyai": "AssemblyAI",
    "gladia": "Gladia",
    "rev.ai": "Rev.ai",
    "speechmatics": "Speechmatics",
    "cartesia": "Cartesia",
    "playht": "PlayHT",
    "lmnt": "LMNT",
    "inworld ai": "Inworld AI",
    "fish audio": "Fish Audio",
    "resemble ai": "Resemble AI",
    "wellsaid labs": "WellSaid Labs",
    "speechify": "Speechify",
    "picovoice": "Picovoice",
    "soniox": "Soniox",
}


def clean_cell(value: Any) -> str | None:
    if value is None:
        return None

    if isinstance(value, float) and math.isnan(value):
        return None

    text = str(value).replace("\r\n", "\n").replace("\r", "\n").strip()
    return text or None


def slugify(value: str | None) -> str | None:
    if not value:
        return None

    slug = re.sub(r"[^0-9a-z]+", "-", value.lower())
    slug = re.sub(r"-{2,}", "-", slug).strip("-")
    return slug or None


def normalize_name(value: str | None) -> str | None:
    if not value:
        return None

    normalized = re.sub(r"[^0-9a-z]+", " ", value.lower()).strip()
    normalized = re.sub(r"\s+", " ", normalized)
    return normalized or None


def split_lines(value: str | None) -> list[str]:
    if not value:
        return []

    return [line.strip() for line in value.splitlines() if line.strip()]


def infer_support_state(raw: str | None, note_text: str | None) -> dict[str, str]:
    raw_value = clean_cell(raw) or ""
    state = SUPPORT_MAP.get(raw_value, "unsupported")

    if raw_value == "~" and note_text:
        lower = note_text.lower()
        if any(
            keyword in lower
            for keyword in (
                "routed",
                "router",
                "routing",
                "openai-compatible",
                "platform-level",
                "infrastructure",
                "runtime layer",
                "drop-in replacement",
            )
        ):
            state = "routed"

    return {
        "raw": raw_value,
        "state": state,
    }


def infer_price_measurements(text: str | None) -> list[dict[str, Any]]:
    if not text:
        return []

    measurements: list[dict[str, Any]] = []
    seen: set[tuple[float, str]] = set()
    lower = text.lower()

    pair_pattern = re.compile(
        r"\$(?P<input>\d+(?:\.\d+)?)\s*/\s*(?:m|mtok|million)[^$]{0,40}?"
        r"(?:input|in)\b[^$]{0,80}?\$(?P<output>\d+(?:\.\d+)?)\s*/\s*"
        r"(?:m|mtok|million)[^$]{0,40}?(?:output|out)\b",
        re.IGNORECASE,
    )
    for match in pair_pattern.finditer(text):
        measurements.append(
            {
                "amountUsd": float(match.group("input")),
                "unit": "million_input_tokens",
                "sourceText": match.group(0).strip(),
            }
        )
        measurements.append(
            {
                "amountUsd": float(match.group("output")),
                "unit": "million_output_tokens",
                "sourceText": match.group(0).strip(),
            }
        )

    def add_matches(pattern: str, unit: str):
        regex = re.compile(pattern, re.IGNORECASE)
        for match in regex.finditer(text):
            amount = float(match.group("amount"))
            key = (amount, unit)
            if key in seen:
                continue
            seen.add(key)
            measurements.append(
                {
                    "amountUsd": amount,
                    "unit": unit,
                    "sourceText": match.group(0).strip(),
                }
            )

    add_matches(r"\$(?P<amount>\d+(?:\.\d+)?)\s*/\s*(?:1m|m)\s*chars?\b", "million_characters")
    add_matches(
        r"\$(?P<amount>\d+(?:\.\d+)?)\s*/\s*(?:1m|m)\s*utf-?8\s*bytes?\b",
        "million_utf8_bytes",
    )
    add_matches(r"\$(?P<amount>\d+(?:\.\d+)?)\s*/\s*(?:audio\s*)?min(?:ute)?s?\b", "minute")
    add_matches(r"\$(?P<amount>\d+(?:\.\d+)?)\s*/\s*(?:chat\s*)?hour\b", "hour")

    if "input" in lower and "output" in lower:
        for item in measurements:
            seen.add((item["amountUsd"], item["unit"]))

    unique_measurements: list[dict[str, Any]] = []
    dedupe: set[tuple[float, str, str]] = set()
    for measurement in measurements:
        key = (
            measurement["amountUsd"],
            measurement["unit"],
            measurement["sourceText"],
        )
        if key in dedupe:
            continue
        dedupe.add(key)
        unique_measurements.append(measurement)

    return unique_measurements


def infer_constraints(text: str | None) -> list[dict[str, Any]]:
    if not text:
        return []

    constraints: list[dict[str, Any]] = []
    lower = text.lower()

    def guess_comparator(match_text: str, context: str) -> str:
        if "<" in match_text:
            return "<="
        if ">" in match_text:
            return ">="
        if "~" in match_text or "approx" in context or "roughly" in context or "about" in context:
            return "~"
        if "up to" in context or "max" in context or "limit" in context:
            return "<="
        return "="

    def append_constraint(metric: str, comparator: str, value: float, unit: str, scope: str):
        constraints.append(
            {
                "metric": metric,
                "comparator": comparator,
                "value": value,
                "unit": unit,
                "scope": scope,
                "sourceText": text,
            }
        )

    for match in re.finditer(r"(?P<prefix>[<>~]?\s*)?(?P<value>\d+(?:\.\d+)?)\s*mb\b", lower):
        context = lower[max(match.start() - 25, 0) : min(match.end() + 25, len(lower))]
        scope = "file" if any(word in context for word in ("file", "upload", "sync", "audio")) else "general"
        append_constraint(
            "file_size_bytes",
            guess_comparator(match.group(0), context),
            float(match.group("value")) * 1_000_000,
            "bytes",
            scope,
        )

    for match in re.finditer(r"(?P<prefix>[<>~]?\s*)?(?P<value>\d+(?:\.\d+)?)\s*kb\b", lower):
        context = lower[max(match.start() - 25, 0) : min(match.end() + 25, len(lower))]
        scope = "streaming" if "stream" in context or "chunk" in context else "general"
        append_constraint(
            "stream_chunk_bytes",
            guess_comparator(match.group(0), context),
            float(match.group("value")) * 1_000,
            "bytes",
            scope,
        )

    duration_patterns = [
        (r"(?P<prefix>[<>~]?\s*)?(?P<value>\d+(?:\.\d+)?)\s*hours?\b", 3600.0),
        (r"(?P<prefix>[<>~]?\s*)?(?P<value>\d+(?:\.\d+)?)\s*min(?:ute)?s?\b", 60.0),
        (r"(?P<prefix>[<>~]?\s*)?(?P<value>\d+(?:\.\d+)?)\s*(?:sec(?:ond)?s?|s)\b", 1.0),
    ]
    for pattern, multiplier in duration_patterns:
        for match in re.finditer(pattern, lower):
            context = lower[max(match.start() - 30, 0) : min(match.end() + 30, len(lower))]
            if "billing" in context:
                continue
            scope = "session" if any(word in context for word in ("session", "connection", "stream")) else "audio"
            metric = "session_duration_seconds" if scope == "session" else "duration_seconds"
            append_constraint(
                metric,
                guess_comparator(match.group(0), context),
                float(match.group("value")) * multiplier,
                "seconds",
                scope,
            )

    for match in re.finditer(r"(?P<value>\d+(?:\.\d+)?)\s*tps\b", lower):
        append_constraint("throughput_tps", "=", float(match.group("value")), "tps", "general")

    for match in re.finditer(r"(?P<value>\d+(?:\.\d+)?)\s*concurrent\b", lower):
        append_constraint("concurrency", "=", float(match.group("value")), "count", "general")

    deduped: list[dict[str, Any]] = []
    seen: set[tuple[str, str, float, str]] = set()
    for constraint in constraints:
        key = (
            constraint["metric"],
            constraint["comparator"],
            constraint["value"],
            constraint["scope"],
        )
        if key in seen:
            continue
        seen.add(key)
        deduped.append(constraint)

    return deduped


def infer_language_support(text: str | None) -> dict[str, Any]:
    if not text or text.lower() == "n/a":
        return {
            "rawText": None,
            "isMultilingual": False,
            "languageCount": None,
            "voiceCount": None,
            "listedLanguages": [],
            "notes": [],
        }

    lower = text.lower()
    language_count_match = re.search(r"(\d+)\+?\s*languages", lower)
    voice_count_match = re.search(r"(\d+)\+?\s*voices", lower)
    language_count = int(language_count_match.group(1)) if language_count_match else None
    voice_count = int(voice_count_match.group(1)) if voice_count_match else None
    listed_languages: list[str] = []

    if "," in text and len(text) < 260 and "$" not in text:
        candidates = [part.strip(" .()") for part in re.split(r",| and ", text) if part.strip()]
        if 1 < len(candidates) <= 40:
            listed_languages = candidates

    notes: list[str] = []
    if "english-optimized" in lower or "english optimized" in lower:
        notes.append("english-optimized")
    if "auto-detect" in lower:
        notes.append("auto-detect")
    if "preview" in lower:
        notes.append("preview")

    return {
        "rawText": text,
        "isMultilingual": "multilingual" in lower or language_count is not None,
        "languageCount": language_count,
        "voiceCount": voice_count,
        "listedLanguages": listed_languages,
        "notes": notes,
    }


def infer_supports_realtime(text: str | None) -> bool | None:
    if not text:
        return None

    lower = text.lower()
    if any(keyword in lower for keyword in ("realtime", "real-time", "websocket", "webrtc", "streaming", "live api", "voice live")):
        return True
    return None


def infer_supports_batch(text: str | None) -> bool | None:
    if not text:
        return None

    lower = text.lower()
    if any(keyword in lower for keyword in ("batch", "async", "file transcription", "pre-recorded", "upload")):
        return True
    return None


def json_dump(path: Path, payload: Any):
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as handle:
        json.dump(payload, handle, ensure_ascii=False, indent=2)
        handle.write("\n")


def read_sheet(path: Path, sheet_name: str, header: int | None = 0) -> pd.DataFrame:
    frame = pd.read_excel(path, sheet_name=sheet_name, header=header)
    frame = frame[[column for column in frame.columns if not str(column).startswith("Unnamed:")]]
    frame = frame[frame.notna().any(axis=1)].copy()
    return frame


def load_workbook_sources(workbook_path: Path):
    byok = read_sheet(workbook_path, "BYOK Providers")
    audit = read_sheet(workbook_path, "Provider Audit", header=1)
    models = read_sheet(workbook_path, "Model Catalog", header=1)
    notes = read_sheet(workbook_path, "App Integration Notes", header=1)
    return byok, audit, models, notes


def build_overview_map(byok: pd.DataFrame) -> dict[str, dict[str, Any]]:
    overview: dict[str, dict[str, Any]] = {}

    for _, row in byok.iterrows():
        provider_name = clean_cell(row.get("Provider"))
        hq = clean_cell(row.get("HQ"))
        if not provider_name or not hq:
            continue

        overview[provider_name] = {
            "llm": clean_cell(row.get("LLM")),
            "tts": clean_cell(row.get("TTS")),
            "stt": clean_cell(row.get("STT")),
            "notes": clean_cell(row.get("Notes")),
        }

    return overview


def parse_markdown_report(report_path: Path | None, provider_names: list[str]):
    if not report_path:
        return {}, None

    content = report_path.read_text(encoding="utf-8")
    lines = content.splitlines()
    provider_lookup = {
        normalize_name(name): name for name in provider_names if normalize_name(name)
    }
    provider_sections: dict[str, dict[str, Any]] = {}
    report_sections: list[dict[str, Any]] = []
    title = lines[0].lstrip("# ").strip() if lines else report_path.name
    active_report_section_title: str | None = None
    active_report_section_lines: list[str] = []

    def flush_report_section():
        nonlocal active_report_section_title, active_report_section_lines
        if not active_report_section_title:
            return
        markdown = "\n".join(active_report_section_lines).strip()
        bullets = [
            line.lstrip("- ").strip()
            for line in active_report_section_lines
            if line.strip().startswith("- ")
        ]
        report_sections.append(
            {
                "title": active_report_section_title,
                "markdown": markdown,
                "bullets": bullets,
            }
        )
        active_report_section_title = None
        active_report_section_lines = []

    index = 0
    while index < len(lines):
        line = lines[index]
        if line.startswith("## "):
            flush_report_section()
            active_report_section_title = line[3:].strip()
            index += 1
            continue

        if line.startswith("### "):
            heading = line[4:].strip()
            match = re.match(r"(?P<number>\d+)\.\s+(?P<name>.+?)(?:\s+—|\s+\(|$)", heading)
            provider_name = None
            if match:
                raw_name = match.group("name").strip()
                normalized = normalize_name(raw_name)
                alias_target = MARKDOWN_PROVIDER_ALIASES.get(normalized or "")
                provider_name = alias_target or provider_lookup.get(normalized)

            if provider_name:
                section_lines = [line]
                index += 1
                while index < len(lines) and not lines[index].startswith("### ") and not lines[index].startswith("## "):
                    section_lines.append(lines[index])
                    index += 1

                section_markdown = "\n".join(section_lines).strip()
                section_text = "\n".join(section_lines[1:]).strip()
                lower = section_text.lower()
                extracted_blocks: dict[str, str] = {}
                for block_name, block_id in (
                    ("free tier", "freeTier"),
                    ("rate limits", "rateLimits"),
                    ("paid tiers", "paidTiers"),
                    ("integration notes", "integrationNotes"),
                    ("datacenters", "datacenters"),
                    ("cloud tts pricing", "pricing"),
                    ("tts pricing", "pricing"),
                ):
                    block_match = re.search(
                        rf"\*\*{re.escape(block_name)}:\*\*\s*(.+)",
                        section_text,
                        re.IGNORECASE,
                    )
                    if block_match:
                        extracted_blocks[block_id] = block_match.group(1).strip()

                openai_compatible = None
                if "not openai-compatible" in lower or "not openai compatible" in lower:
                    openai_compatible = False
                elif "openai-compatible" in lower or "openai compatible" in lower:
                    openai_compatible = True

                protocols = sorted(
                    {
                        protocol
                        for keyword, protocol in PROTOCOL_PATTERNS.items()
                        if keyword in lower
                    }
                )

                next_section = {
                    "title": heading,
                    "sourcePath": str(report_path),
                    "markdown": section_markdown,
                    "extractedBlocks": extracted_blocks,
                    "openAiCompatible": openai_compatible,
                    "protocols": protocols,
                }
                existing_section = provider_sections.get(provider_name)
                if not existing_section or len(section_markdown) > len(existing_section["markdown"]):
                    provider_sections[provider_name] = next_section
                continue

        if active_report_section_title:
            active_report_section_lines.append(line)

        index += 1

    flush_report_section()

    supplemental_report = {
        "title": title,
        "sourcePath": str(report_path),
        "sections": report_sections,
    }

    return provider_sections, supplemental_report


def build_model_filename(service: str, model_id: str) -> str:
    safe_id = model_id.replace("/", "__")
    safe_id = re.sub(r"[^0-9A-Za-z._-]+", "-", safe_id)
    safe_id = re.sub(r"-{2,}", "-", safe_id).strip("-")
    return f"{service}--{safe_id}.json"


def build_snapshot(
    workbook_path: Path,
    report_path: Path | None,
    overview_map: dict[str, dict[str, Any]],
    audit: pd.DataFrame,
    models: pd.DataFrame,
    notes: pd.DataFrame,
    provider_sections: dict[str, dict[str, Any]],
    supplemental_report: dict[str, Any] | None,
):
    audit = audit[audit["Provider"].notna()].copy()
    models = models[models["Provider"].notna()].copy()

    provider_documents: list[dict[str, Any]] = []
    model_documents: list[dict[str, Any]] = []
    service_counts = Counter()

    for _, provider_row in audit.iterrows():
        provider_name = clean_cell(provider_row.get("Provider"))
        if not provider_name:
            continue

        provider_id = slugify(provider_name)
        category_name = clean_cell(provider_row.get("Category")) or "Uncategorized"
        category_id = slugify(category_name) or "uncategorized"
        provider_dir = PROVIDERS_DIR / provider_id
        provider_path = Path("data") / "provider-catalog" / "providers" / provider_id / "provider.json"
        model_dir = provider_dir / "models"
        model_refs: list[dict[str, Any]] = []
        used_model_filenames: set[str] = set()

        provider_model_rows = models[models["Provider"] == provider_name].copy()
        provider_model_rows = provider_model_rows.sort_values(["Type", "Public name"])
        supplemental = provider_sections.get(provider_name)

        for _, model_row in provider_model_rows.iterrows():
            service = clean_cell(model_row.get("Type"))
            model_id = clean_cell(model_row.get("Model / family ID"))
            public_name = clean_cell(model_row.get("Public name"))
            if not service or not model_id or not public_name:
                continue

            service_id = service.lower()
            model_filename = build_model_filename(service_id, model_id)
            if model_filename in used_model_filenames:
                public_name_slug = slugify(public_name) or "model"
                model_filename = model_filename.replace(
                    ".json",
                    f"--{public_name_slug}.json",
                )
            suffix = 2
            while model_filename in used_model_filenames:
                model_filename = model_filename.replace(".json", f"-{suffix}.json")
                suffix += 1
            used_model_filenames.add(model_filename)
            model_path = (
                Path("data")
                / "provider-catalog"
                / "providers"
                / provider_id
                / "models"
                / model_filename
            )
            combined_text = "\n".join(
                filter(
                    None,
                    [
                        clean_cell(model_row.get("Pricing / examples")),
                        clean_cell(model_row.get("Limits / quotas")),
                        clean_cell(model_row.get("Languages")),
                        clean_cell(model_row.get("Notes")),
                        supplemental["markdown"] if supplemental else None,
                    ],
                )
            )
            model_doc = {
                "schemaVersion": SCHEMA_VERSION,
                "documentType": "model",
                "providerId": provider_id,
                "providerName": provider_name,
                "categoryId": category_id,
                "categoryName": category_name,
                "service": service_id,
                "publicName": public_name,
                "modelId": model_id,
                "status": clean_cell(model_row.get("Status")),
                "statusId": slugify(clean_cell(model_row.get("Status"))),
                "catalogScope": clean_cell(model_row.get("Catalog scope")),
                "catalogScopeId": slugify(clean_cell(model_row.get("Catalog scope"))),
                "pricingSummary": clean_cell(model_row.get("Pricing / examples")),
                "limitsSummary": clean_cell(model_row.get("Limits / quotas")),
                "regionSummary": clean_cell(model_row.get("Datacenter / region")),
                "languagesSummary": clean_cell(model_row.get("Languages")),
                "notes": clean_cell(model_row.get("Notes")),
                "officialSources": split_lines(clean_cell(model_row.get("Official sources"))),
                "derived": {
                    "openAiCompatible": supplemental["openAiCompatible"] if supplemental else None,
                    "supportsRealtime": infer_supports_realtime(combined_text),
                    "supportsBatch": infer_supports_batch(combined_text),
                    "priceMeasurements": infer_price_measurements(
                        clean_cell(model_row.get("Pricing / examples"))
                    ),
                    "constraints": infer_constraints(clean_cell(model_row.get("Limits / quotas"))),
                    "languageSupport": infer_language_support(
                        clean_cell(model_row.get("Languages"))
                    ),
                },
            }
            model_documents.append(model_doc)
            service_counts[service_id] += 1
            model_refs.append(
                {
                    "service": service_id,
                    "modelId": model_id,
                    "publicName": public_name,
                    "documentPath": str(model_path),
                }
            )

            json_dump(model_dir / model_filename, model_doc)

        supplemental_markdown = provider_sections.get(provider_name)
        note_text = clean_cell(provider_row.get("App integration notes"))
        region_summary = clean_cell(provider_row.get("Datacenter / region / residency"))
        low_confidence = "low-confidence" in (
            slugify(clean_cell(provider_row.get("Coverage"))) or ""
        )
        provider_doc = {
            "schemaVersion": SCHEMA_VERSION,
            "documentType": "provider",
            "providerId": provider_id,
            "providerName": provider_name,
            "categoryId": category_id,
            "categoryName": category_name,
            "hq": clean_cell(provider_row.get("HQ")),
            "existsStatus": {
                "raw": clean_cell(provider_row.get("Exists?")),
                "normalized": slugify(clean_cell(provider_row.get("Exists?"))),
            },
            "sourceOverview": overview_map.get(provider_name),
            "originalSupport": {
                "llm": infer_support_state(provider_row.get("Original LLM"), note_text),
                "tts": infer_support_state(provider_row.get("Original TTS"), note_text),
                "stt": infer_support_state(provider_row.get("Original STT"), note_text),
            },
            "verifiedSupport": {
                "llm": infer_support_state(provider_row.get("Verified LLM"), note_text),
                "tts": infer_support_state(provider_row.get("Verified TTS"), note_text),
                "stt": infer_support_state(provider_row.get("Verified STT"), note_text),
            },
            "audit": {
                "inputVsCurrent": clean_cell(provider_row.get("Input vs current")),
                "catalogType": clean_cell(provider_row.get("Catalog type")),
                "catalogTypeId": slugify(clean_cell(provider_row.get("Catalog type"))),
                "coverage": clean_cell(provider_row.get("Coverage")),
                "coverageId": slugify(clean_cell(provider_row.get("Coverage"))),
                "activeModelsSummary": {
                    "llm": clean_cell(provider_row.get("Active LLM models (public name [id])")),
                    "tts": clean_cell(provider_row.get("Active TTS models (public name [id])")),
                    "stt": clean_cell(provider_row.get("Active STT models (public name [id])")),
                },
                "priceRangeSummary": clean_cell(provider_row.get("Price range / examples")),
                "limitsSummary": clean_cell(provider_row.get("Model limits / quotas")),
                "regionSummary": region_summary,
                "ttsLanguagesSummary": clean_cell(provider_row.get("TTS languages")),
                "sttLanguagesSummary": clean_cell(provider_row.get("STT languages")),
                "freeTierSummary": clean_cell(provider_row.get("Free tier / trial")),
                "appIntegrationNotes": note_text,
                "officialSources": split_lines(clean_cell(provider_row.get("Official sources"))),
            },
            "derived": {
                "verifiedServiceCount": sum(
                    1
                    for key in ("llm", "tts", "stt")
                    if infer_support_state(
                        provider_row.get(
                            {
                                "llm": "Verified LLM",
                                "tts": "Verified TTS",
                                "stt": "Verified STT",
                            }[key]
                        ),
                        note_text,
                    )["state"]
                    != "unsupported"
                ),
                "hasDynamicCatalog": "dynamic" in (
                    slugify(clean_cell(provider_row.get("Catalog type"))) or ""
                ),
                "needsLiveDiscovery": "dynamic" in (
                    slugify(clean_cell(provider_row.get("Coverage"))) or ""
                )
                or "dynamic" in (slugify(clean_cell(provider_row.get("Catalog type"))) or ""),
                "supportsSpeech": any(
                    infer_support_state(provider_row.get(column), note_text)["state"]
                    != "unsupported"
                    for column in ("Verified TTS", "Verified STT")
                ),
                "lowConfidence": low_confidence,
                "openAiCompatible": supplemental_markdown["openAiCompatible"]
                if supplemental_markdown
                else None,
                "protocols": supplemental_markdown["protocols"] if supplemental_markdown else [],
                "regionSplitRecommended": any(
                    keyword in (f"{region_summary or ''} {note_text or ''}").lower()
                    for keyword in ("mainland", "international", "frankfurt", "singapore", "sovereign", "data residency")
                ),
            },
            "documents": {
                "providerPath": str(provider_path),
                "modelDocumentPaths": [model_ref["documentPath"] for model_ref in model_refs],
            },
            "models": model_refs,
            "supplementalResearch": supplemental_markdown,
        }
        provider_documents.append(provider_doc)
        json_dump(provider_dir / "provider.json", provider_doc)

    app_integration_notes = []
    for _, row in notes.iterrows():
        topic = clean_cell(row.get("Topic"))
        if not topic:
            continue
        app_integration_notes.append(
            {
                "topic": topic,
                "recommendation": clean_cell(row.get("Recommendation")) or "",
                "whyItMatters": clean_cell(row.get("Why it matters")) or "",
                "exampleProviders": [
                    provider.strip()
                    for provider in (clean_cell(row.get("Example providers")) or "").split(",")
                    if provider.strip()
                ],
            }
        )

    provider_documents.sort(key=lambda item: (item["categoryName"], item["providerName"]))
    model_documents.sort(key=lambda item: (item["providerName"], item["service"], item["publicName"]))

    snapshot = {
        "schemaVersion": SCHEMA_VERSION,
        "generatedAt": pd.Timestamp.now("UTC").isoformat(),
        "sourceWorkbookPath": str(workbook_path),
        "sourceWorkbookName": workbook_path.name,
        "reportSourcePath": str(report_path) if report_path else None,
        "stats": {
            "providerCount": len(provider_documents),
            "modelCount": len(model_documents),
            "serviceCounts": {
                "llm": service_counts.get("llm", 0),
                "stt": service_counts.get("stt", 0),
                "tts": service_counts.get("tts", 0),
            },
        },
        "providers": provider_documents,
        "models": model_documents,
        "appIntegrationNotes": app_integration_notes,
        "supplementalReport": supplemental_report,
    }

    return snapshot


def main():
    parser = argparse.ArgumentParser(
        description="Import the BYOK provider audit workbook into the committed provider catalog.",
    )
    parser.add_argument("workbook", help="Path to the source .xlsx workbook")
    parser.add_argument(
        "--report",
        dest="report",
        help="Optional supplemental markdown research report to merge in",
    )
    args = parser.parse_args()

    workbook_path = Path(args.workbook).expanduser().resolve()
    if not workbook_path.exists():
        raise SystemExit(f"Workbook not found: {workbook_path}")

    report_path = Path(args.report).expanduser().resolve() if args.report else None
    if report_path and not report_path.exists():
        raise SystemExit(f"Report not found: {report_path}")

    byok, audit, models, notes = load_workbook_sources(workbook_path)
    overview_map = build_overview_map(byok)
    provider_sections, supplemental_report = parse_markdown_report(
        report_path,
        provider_names=[clean_cell(value) for value in audit["Provider"].tolist() if clean_cell(value)],
    )

    shutil.rmtree(PROVIDERS_DIR, ignore_errors=True)
    PROVIDERS_DIR.mkdir(parents=True, exist_ok=True)
    REPORTS_DIR.mkdir(parents=True, exist_ok=True)

    snapshot = build_snapshot(
        workbook_path=workbook_path,
        report_path=report_path,
        overview_map=overview_map,
        audit=audit,
        models=models,
        notes=notes,
        provider_sections=provider_sections,
        supplemental_report=supplemental_report,
    )

    json_dump(DATA_DIR / "catalog.snapshot.json", snapshot)
    json_dump(
        DATA_DIR / "source-manifest.json",
        {
            "schemaVersion": SCHEMA_VERSION,
            "generatedAt": snapshot["generatedAt"],
            "workbookPath": str(workbook_path),
            "reportPath": str(report_path) if report_path else None,
        },
    )
    if supplemental_report:
        json_dump(REPORTS_DIR / "compass-research-report.json", supplemental_report)

    print(
        f"Wrote {snapshot['stats']['providerCount']} providers and "
        f"{snapshot['stats']['modelCount']} models to {DATA_DIR}"
    )


if __name__ == "__main__":
    main()
