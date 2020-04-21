package hu.aut.meixner.dto.mapping

import hu.aut.meixner.domain.task.MediaItemEntity
import hu.aut.meixner.domain.task.easytask.*
import hu.aut.meixner.dto.task.easy.*
import java.time.OffsetDateTime

//region Pairing
fun PairingRequest.toEntity(owner: String, pairs: List<PairEntity>): PairingEntity {
    return PairingEntity(
            pairs = pairs,
            title = title,
            difficulty = difficulty,
            owner = owner,
            recommendedMinClass = recommendedMinClass,
            recommendedMaxClass = recommendedMaxClass,
            lastModified = OffsetDateTime.now()
    )
}

fun PairingEntity.toDomainModel(): PairingResponse {
    return PairingResponse(
            id = id,
            lastModified = lastModified,
            difficulty = difficulty,
            title = title,
            owner = owner,
            subject = subject,
            recommendedMinClass = recommendedMinClass,
            recommendedMaxClass = recommendedMaxClass,
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
fun GroupingRequest.toEntity(owner: String, groups: List<GroupElementEntity>): GroupingEntity {
    return GroupingEntity(
            groups = groups,
            title = title,
            difficulty = difficulty,
            owner = owner,
            subject = subject,
            recommendedMinClass = recommendedMinClass,
            recommendedMaxClass = recommendedMaxClass,
            lastModified = OffsetDateTime.now()
    )
}

fun GroupingEntity.toDomainModel(): GroupingResponse {
    return GroupingResponse(
            id = id,
            lastModified = lastModified,
            difficulty = difficulty,
            title = title,
            owner = owner,
            subject = subject,
            recommendedMinClass = recommendedMinClass,
            recommendedMaxClass = recommendedMaxClass,
            groups = groups.map { it.toDomainModel() }
    )
}

fun GroupElementEntity.toDomainModel(): GroupResponse {
    return GroupResponse(
            name = name,
            elements = elements.map { it.toDomainModel() }
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
            subject = subject,
            recommendedMinClass = recommendedMinClass,
            recommendedMaxClass = recommendedMaxClass,
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
            subject = subject,
            recommendedMinClass = recommendedMinClass,
            recommendedMaxClass = recommendedMaxClass,
            lastModified = OffsetDateTime.now()
    )
}
//endregion

//region Sorting
fun SortingRequest.toEntity(owner: String, elements: List<MediaItemEntity>): SortingEntity {
    return SortingEntity(
            title = title,
            elements = elements.toMutableList(),
            owner = owner,
            difficulty = difficulty,
            subject = subject,
            recommendedMinClass = recommendedMinClass,
            recommendedMaxClass = recommendedMaxClass,
            lastModified = OffsetDateTime.now()
    )
}

fun SortingEntity.toDomainModel(): SortingResponse {
    return SortingResponse(
            id = id,
            title = title,
            elements = elements.map { it.toDomainModel() },
            difficulty = difficulty,
            owner = owner,
            subject = subject,
            recommendedMinClass = recommendedMinClass,
            recommendedMaxClass = recommendedMaxClass,
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
            subject = subject,
            recommendedMinClass = recommendedMinClass,
            recommendedMaxClass = recommendedMaxClass,
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
            subject = subject,
            recommendedMinClass = recommendedMinClass,
            recommendedMaxClass = recommendedMaxClass,
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