#!/usr/bin/env python3

import json
import re
import sys
from collections import OrderedDict
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[2]
RESEARCH_ROOT = REPO_ROOT / "provider-research"
CATALOG_ROOT = REPO_ROOT / "data" / "providers"

SERVICE_METADATA = {
    "llm": {
        "export_name": "llms",
        "define_call": "defineLlms",
        "model_call": "llm",
        "filename": "llms.ts",
    },
    "stt": {
        "export_name": "stt",
        "define_call": "defineSttModels",
        "model_call": "stt",
        "filename": "stt.ts",
    },
    "tts": {
        "export_name": "tts",
        "define_call": "defineTtsModels",
        "model_call": "tts",
        "filename": "tts.ts",
    },
}


def indent_block(text: str, spaces: int) -> str:
    prefix = " " * spaces
    return "\n".join(f"{prefix}{line}" if line else line for line in text.splitlines())


def render_json(value: object, spaces: int) -> str:
    return indent_block(json.dumps(value, indent=2, ensure_ascii=True), spaces)


def parse_size_bytes(source_text: str) -> int | None:
    match = re.search(r"(\d+(?:,\d{3})*(?:\.\d+)?)\s*(MiB|MB|KB|GB)\b", source_text)

    if not match:
        return None

    value = float(match.group(1).replace(",", ""))
    unit = match.group(2)

    if unit == "KB":
        multiplier = 1_000
    elif unit == "MB":
        multiplier = 1_000_000
    elif unit == "GB":
        multiplier = 1_000_000_000
    else:
        multiplier = 1_048_576

    return int(value * multiplier)


def normalize_constraint(constraint: dict) -> dict:
    if constraint.get("metric") != "other":
        return constraint

    if constraint.get("scope") not in {"file", "streaming"}:
        return constraint

    size_bytes = parse_size_bytes(constraint.get("sourceText", ""))

    if size_bytes is None:
        return constraint

    normalized = dict(constraint)
    normalized["metric"] = (
        "file_size_bytes" if constraint.get("scope") == "file" else "stream_chunk_bytes"
    )
    normalized["unit"] = "bytes"
    normalized["value"] = size_bytes

    return normalized


def normalize_model(model: dict) -> dict:
    normalized = dict(model)
    normalized["constraints"] = [
        normalize_constraint(constraint)
        for constraint in normalized.get("constraints") or []
    ]

    return normalized


def normalize_aliases(models: list[dict]) -> list[dict]:
    canonical_ids_by_service: dict[str, set[str]] = {}

    for model in models:
        canonical_ids_by_service.setdefault(model["service"], set()).add(model["modelId"])

    normalized_models = []

    for model in models:
        normalized = dict(model)
        aliases = []

        for alias in normalized.get("aliases") or []:
            if alias == normalized["modelId"]:
                continue
            if alias in canonical_ids_by_service[normalized["service"]]:
                continue
            aliases.append(alias)

        normalized["aliases"] = aliases
        normalized_models.append(normalized)

    return normalized_models


def unique_values(values: list[str]) -> list[str]:
    seen = set()
    result = []

    for value in values:
        if not value or value in seen:
            continue
        seen.add(value)
        result.append(value)

    return result


def unique_objects(values: list[dict]) -> list[dict]:
    seen = set()
    result = []

    for value in values:
        key = json.dumps(value, sort_keys=True, ensure_ascii=True)
        if key in seen:
            continue
        seen.add(key)
        result.append(value)

    return result


def merge_language_support(models: list[dict]) -> dict:
    language_support = [model.get("languageSupport") or {} for model in models]

    return {
        "rawText": " ".join(
            unique_values(
                [support.get("rawText", "") for support in language_support]
            )
        ),
        "isMultilingual": any(
            bool(support.get("isMultilingual")) for support in language_support
        ),
        "languageCount": max(
            [int(support.get("languageCount") or 0) for support in language_support],
            default=0,
        ),
        "voiceCount": max(
            [int(support.get("voiceCount") or 0) for support in language_support],
            default=0,
        ),
        "listedLanguages": unique_values(
            [
                language
                for support in language_support
                for language in support.get("listedLanguages") or []
            ]
        ),
        "notes": unique_values(
            [
                note
                for support in language_support
                for note in support.get("notes") or []
            ]
        ),
    }


def merge_duplicate_models(models: list[dict]) -> list[dict]:
    grouped: OrderedDict[tuple[str, str], list[dict]] = OrderedDict()

    for model in models:
        grouped.setdefault((model["service"], model["modelId"]), []).append(model)

    merged_models = []

    for duplicates in grouped.values():
        if len(duplicates) == 1:
            merged_models.append(duplicates[0])
            continue

        merged = dict(duplicates[0])
        public_names = unique_values([model.get("publicName", "") for model in duplicates])
        notes = unique_values([model.get("notes", "") for model in duplicates])

        if len(public_names) > 1:
            notes.append(
                "Merged research variants: " + "; ".join(public_names) + "."
            )

        merged["aliases"] = unique_values(
            [
                alias
                for model in duplicates
                for alias in model.get("aliases") or []
            ]
        )
        merged["pricingSummary"] = " ".join(
            unique_values([model.get("pricingSummary", "") for model in duplicates])
        )
        merged["limitsSummary"] = " ".join(
            unique_values([model.get("limitsSummary", "") for model in duplicates])
        )
        merged["regionSummary"] = " ".join(
            unique_values([model.get("regionSummary", "") for model in duplicates])
        )
        merged["languagesSummary"] = " ".join(
            unique_values([model.get("languagesSummary", "") for model in duplicates])
        )
        merged["notes"] = " ".join(notes)
        merged["officialSources"] = unique_values(
            [
                source
                for model in duplicates
                for source in model.get("officialSources") or []
            ]
        )
        merged["supportsRealtime"] = any(
            bool(model.get("supportsRealtime")) for model in duplicates
        )
        merged["supportsBatch"] = any(
            bool(model.get("supportsBatch")) for model in duplicates
        )
        merged["priceMeasurements"] = unique_objects(
            [
                measurement
                for model in duplicates
                for measurement in model.get("priceMeasurements") or []
            ]
        )
        merged["constraints"] = unique_objects(
            [
                constraint
                for model in duplicates
                for constraint in model.get("constraints") or []
            ]
        )
        merged["languageSupport"] = merge_language_support(duplicates)
        merged_models.append(merged)

    return merged_models


def load_provider_research(slug: str) -> tuple[dict, list[dict]]:
    provider_dir = RESEARCH_ROOT / slug

    if not provider_dir.is_dir():
        raise SystemExit(f"Unknown provider research slug: {slug}")

    provider = json.loads((provider_dir / "provider.json").read_text())
    models = json.loads((provider_dir / "models.json").read_text())

    if provider.get("providerId") != slug:
        raise SystemExit(
            f"Provider slug mismatch for {slug}: providerId={provider.get('providerId')}"
        )

    for model in models:
        if model.get("providerId") != slug:
            raise SystemExit(
                f"Model providerId mismatch for {slug}/{model.get('service')}/{model.get('modelId')}"
            )
        if model.get("service") not in SERVICE_METADATA:
            raise SystemExit(
                f"Unsupported service for {slug}/{model.get('modelId')}: {model.get('service')}"
            )

    normalized_models = merge_duplicate_models(
        normalize_aliases([normalize_model(model) for model in models])
    )

    return provider, normalized_models


def render_provider_file(provider: dict) -> str:
    return "\n".join(
        [
            'import { createProviderContext, defineProviderDefinition } from "../../definitions";',
            "",
            "export const providerDefinition = defineProviderDefinition(",
            render_json(provider, 2) + ",",
            ");",
            "",
            "export const providerContext = createProviderContext(providerDefinition);",
            "",
        ]
    )


def render_service_file(service: str, models: list[dict]) -> str:
    metadata = SERVICE_METADATA[service]
    lines = [
        'import { providerContext } from "./provider";',
        "",
        f'export const {metadata["export_name"]} = providerContext.{metadata["define_call"]}([',
    ]

    for model in models:
        lines.append(f'  providerContext.{metadata["model_call"]}(')
        lines.append(render_json(model, 4))
        lines.append("  ),")

    lines.extend(
        [
            "]);",
            "",
        ]
    )

    return "\n".join(lines)


def render_index_file() -> str:
    return "\n".join(
        [
            'import { llms } from "./llms";',
            'import { providerContext } from "./provider";',
            'import { stt } from "./stt";',
            'import { tts } from "./tts";',
            "",
            "export default providerContext.document({",
            "  llms,",
            "  stt,",
            "  tts,",
            "});",
            "",
        ]
    )


def write_provider(slug: str) -> None:
    provider, models = load_provider_research(slug)
    provider_dir = CATALOG_ROOT / slug
    provider_dir.mkdir(parents=True, exist_ok=True)

    by_service = {service: [] for service in SERVICE_METADATA}
    for model in models:
        by_service[model["service"]].append(model)

    (provider_dir / "provider.ts").write_text(render_provider_file(provider))
    (provider_dir / "index.ts").write_text(render_index_file())

    for service, metadata in SERVICE_METADATA.items():
        (provider_dir / metadata["filename"]).write_text(
            render_service_file(service, by_service[service])
        )


def main() -> None:
    slugs = sys.argv[1:]

    if not slugs:
        raise SystemExit(
            "Usage: python3 scripts/provider_catalog/import_research_provider.py <provider-slug> [<provider-slug> ...]"
        )

    for slug in slugs:
        write_provider(slug)


if __name__ == "__main__":
    main()
