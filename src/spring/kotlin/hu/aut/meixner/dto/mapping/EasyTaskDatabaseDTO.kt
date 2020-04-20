package hu.aut.meixner.dto.mapping

import hu.aut.meixner.domain.task.easytask.*
import hu.aut.meixner.dto.task.easy.*
import java.time.OffsetDateTime

//region Pairing
fun PairingRequest.toEntity(owner: String): PairingEntity {
    return PairingEntity(
            pairs = pairs.map { it.toEntity() },
            title = title,
            difficulty = difficulty,
            owner = owner,
            lastModified = OffsetDateTime.now()
    )
}

fun PairElementRequest.toEntity(): PairEntity {
    return PairEntity(
            pair = pair.map { it.toEntity() }.toMutableList()
    )
}

fun PairingEntity.toDomainModel(): PairingResponse {
    return PairingResponse(
            id = id,
            lastModified = lastModified,
            difficulty = difficulty,
            title = title,
            owner = owner,
            pairs = pairs.map { it.toDomainModel() }
    )
}

fun PairEntity.toDomainModel(): PairElementResponse {
    return PairElementResponse(
            pair = pair.map { it.toDomainModel() }
    )
}
//endregion

//region Grouping
fun GroupingRequest.toEntity(owner: String): GroupingEntity {
    return GroupingEntity(
            groups = groups.map { it.toEntity() },
            title = title,
            difficulty = difficulty,
            owner = owner,
            lastModified = OffsetDateTime.now()
    )
}

fun Group.toEntity(): GroupElementEntity {
    return GroupElementEntity(
            name = name,
            elements = elements.toMutableList()
    )
}

fun GroupingEntity.toDomainModel(): GroupingResponse {
    return GroupingResponse(
            id = id,
            lastModified = lastModified,
            difficulty = difficulty,
            title = title,
            owner = owner,
            groups = groups.map { it.toDomainModel() }
    )
}

fun GroupElementEntity.toDomainModel(): Group {
    return Group(
            name = name,
            elements = elements
    )
}
//endregion

//region SentenceCompletion
fun SentenceCompletionRequest.toEntity(owner: String): SentenceCompletionEntity {
    return SentenceCompletionEntity(
            title = title,
            sentence = sentence,
            options = options.toMutableList(),
            owner = owner,
            difficulty = difficulty,
            lastModified = OffsetDateTime.now()
    )
}

fun SentenceCompletionEntity.toDomainModel(): SentenceCompletionResponse {
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
fun SortingRequest.toEntity(owner: String): SortingEntity {
    return SortingEntity(
            title = title,
            elements = elements.toMutableList(),
            owner = owner,
            difficulty = difficulty,
            lastModified = OffsetDateTime.now()
    )
}

fun SortingEntity.toDomainModel(): SortingResponse {
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
fun SentenceCreationRequest.toEntity(owner: String): SentenceCreationEntity {
    return SentenceCreationEntity(
            sentences = sentences.map { it.toEntity() },
            title = title,
            owner = owner,
            difficulty = difficulty,
            lastModified = OffsetDateTime.now()
    )
}

fun Sentence.toEntity(): SentenceEntity {
    return SentenceEntity(
            sentenceTitle = sentenceTitle,
            parts = parts.toMutableList()
    )
}

fun SentenceCreationEntity.toDomainModel(): SentenceCreationResponse {
    return SentenceCreationResponse(
            id = id,
            lastModified = lastModified,
            difficulty = difficulty,
            title = title,
            owner = owner,
            sentences = sentences.map { it.toDomainModel() }
    )
}

fun SentenceEntity.toDomainModel(): Sentence {
    return Sentence(
            sentenceTitle = sentenceTitle,
            parts = parts
    )
}
//endregion