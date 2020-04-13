package hu.aut.meixner.dto.mapping

import hu.aut.meixner.domain.easytask.*
import hu.aut.meixner.dto.task.easy.*
import java.time.OffsetDateTime

//region Pairing
fun PairingRequest.toDBModel(owner: String): PairingEntity {
    return PairingEntity(
            pairs = pairs.map { it.toDBModel() },
            title = title,
            difficulty = difficulty,
            owner = owner,
            lastModified = OffsetDateTime.now()
    )
}

fun PairElement.toDBModel(): PairEntity {
    return PairEntity(
            pair = pair
    )
}

fun PairingEntity.toEntity(): PairingResponse {
    return PairingResponse(
            id = id,
            lastModified = lastModified,
            difficulty = difficulty,
            title = title,
            owner = owner,
            pairs = pairs.map { it.toEntity() }
    )
}

fun PairEntity.toEntity(): PairElement {
    return PairElement(
            pair = pair
    )
}
//endregion

//region Grouping
fun GroupingRequest.toDBModel(owner: String): GroupingEntity {
    return GroupingEntity(
            groups = groups.map { it.toDBModel() },
            title = title,
            difficulty = difficulty,
            owner = owner,
            lastModified = OffsetDateTime.now()
    )
}

fun Group.toDBModel(): GroupElementEntity {
    return GroupElementEntity(
            name = name,
            elements = elements.toMutableList()
    )
}

fun GroupingEntity.toEntity(): GroupingResponse {
    return GroupingResponse(
            id = id,
            lastModified = lastModified,
            difficulty = difficulty,
            title = title,
            owner = owner,
            groups = groups.map { it.toEntity() }
    )
}

fun GroupElementEntity.toEntity(): Group {
    return Group(
            name = name,
            elements = elements
    )
}
//endregion

//region SentenceCompletion
fun SentenceCompletionRequest.toDBModel(owner: String): SentenceCompletionEntity {
    return SentenceCompletionEntity(
            title = title,
            sentence = sentence,
            options = options,
            owner = owner,
            difficulty = difficulty,
            lastModified = OffsetDateTime.now()
    )
}

fun SentenceCompletionEntity.toEntity(): SentenceCompletionResponse {
    return SentenceCompletionResponse(
            id = id,
            title = title,
            sentence = sentence,
            options = options,
            difficulty = difficulty,
            owner = owner,
            lastModified = OffsetDateTime.now()
    )
}
//endregion

//region Sorting
fun SortingRequest.toDBModel(owner: String): SortingEntity {
    return SortingEntity(
            title = title,
            elements = elements,
            owner = owner,
            difficulty = difficulty,
            lastModified = OffsetDateTime.now()
    )
}

fun SortingEntity.toEntity(): SortingResponse {
    return SortingResponse(
            id = id,
            title = title,
            elements = elements,
            difficulty = difficulty,
            owner = owner,
            lastModified = OffsetDateTime.now()
    )
}
//endregion

//region Grouping
fun SentenceCreationRequest.toDBModel(owner: String): SentenceCreationEntity {
    return SentenceCreationEntity(
            sentences = sentences.map { it.toDBModel() },
            title = title,
            owner = owner,
            difficulty = difficulty,
            lastModified = OffsetDateTime.now()
    )
}

fun Sentence.toDBModel(): SentenceEntity {
    return SentenceEntity(
            sentenceTitle = sentenceTitle,
            parts = parts
    )
}

fun SentenceCreationEntity.toEntity(): SentenceCreationResponse {
    return SentenceCreationResponse(
            id = id,
            lastModified = lastModified,
            difficulty = difficulty,
            title = title,
            owner = owner,
            sentences = sentences.map { it.toEntity() }
    )
}

fun SentenceEntity.toEntity(): Sentence {
    return Sentence(
            sentenceTitle = sentenceTitle,
            parts = parts
    )
}
//endregion