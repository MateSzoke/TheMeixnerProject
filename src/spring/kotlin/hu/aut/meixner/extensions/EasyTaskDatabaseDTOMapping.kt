package hu.aut.meixner.extensions

import hu.aut.meixner.domain.easytask.*
import hu.aut.meixner.dto.task.easy.*
import java.time.OffsetDateTime

//region Pairing
fun PairingRequest.toDBModel(): PairingEntity {
    return PairingEntity(
            pairs = pairs.map { it.toDBModel() },
            title = title,
            difficulty = 0,
            lastModified = OffsetDateTime.now()
    )
}

fun PairElement.toDBModel(): PairEntity {
    return PairEntity(
            name = name,
            pair = pair
    )
}

fun PairingEntity.toDTOModel(): PairingResponse {
    return PairingResponse(
            id = id,
            lastModified = lastModified,
            difficulty = difficulty,
            title = title,
            pairs = pairs.map { it.toDTOModel() }
    )
}

fun PairEntity.toDTOModel(): PairElement {
    return PairElement(
            name = name,
            pair = pair
    )
}
//endregion

//region Grouping
fun GroupingRequest.toDBModel(): GroupingEntity {
    return GroupingEntity(
            groups = groups.map { it.toDBModel() },
            title = title,
            difficulty = 0,
            lastModified = OffsetDateTime.now()
    )
}

fun Group.toDBModel(): GroupElementEntity {
    return GroupElementEntity(
            name = name,
            elements = elements.toMutableList()
    )
}

fun GroupingEntity.toDTOModel(): GroupingResponse {
    return GroupingResponse(
            id = id,
            lastModified = lastModified,
            difficulty = difficulty,
            title = title,
            groups = groups.map { it.toDTOModel() }
    )
}

fun GroupElementEntity.toDTOModel(): Group {
    return Group(
            name = name,
            elements = elements
    )
}
//endregion

//region SentenceCompletion
fun SentenceCompletionRequest.toDBModel(): SentenceCompletionEntity {
    return SentenceCompletionEntity(
            title = title,
            sentence = sentence,
            options = options,
            difficulty = 0,
            lastModified = OffsetDateTime.now()
    )
}

fun SentenceCompletionEntity.toDTOModel(): SentenceCompletionResponse {
    return SentenceCompletionResponse(
            id = id,
            title = title,
            sentence = sentence,
            options = options,
            difficulty = 0,
            lastModified = OffsetDateTime.now()
    )
}
//endregion

//region Sorting
fun SortingRequest.toDBModel(): SortingEntity {
    return SortingEntity(
            title = title,
            elements = elements,
            difficulty = 0,
            lastModified = OffsetDateTime.now()
    )
}

fun SortingEntity.toDTOModel(): SortingResponse {
    return SortingResponse(
            id = id,
            title = title,
            elements = elements,
            difficulty = 0,
            lastModified = OffsetDateTime.now()
    )
}
//endregion

//region Grouping
fun SentenceCreationRequest.toDBModel(): SentenceCreationEntity {
    return SentenceCreationEntity(
            sentences = sentences.map { it.toDBModel() },
            title = title,
            difficulty = 0,
            lastModified = OffsetDateTime.now()
    )
}

fun Sentence.toDBModel(): SentenceEntity {
    return SentenceEntity(
            sentenceTitle = sentenceTitle,
            parts = parts
    )
}

fun SentenceCreationEntity.toDTOModel(): SentenceCreationResponse {
    return SentenceCreationResponse(
            id = id,
            lastModified = lastModified,
            difficulty = difficulty,
            title = title,
            sentences = sentences.map { it.toDTOModel() }
    )
}

fun SentenceEntity.toDTOModel(): Sentence {
    return Sentence(
            sentenceTitle = sentenceTitle,
            parts = parts
    )
}
//endregion