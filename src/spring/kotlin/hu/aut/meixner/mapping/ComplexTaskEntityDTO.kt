package hu.aut.meixner.mapping

import hu.aut.meixner.dto.task.complex.*
import hu.aut.meixner.entity.task.complex.GroupingAndSortingEntity
import hu.aut.meixner.entity.task.complex.SentenceCreationAndGroupingEntity
import hu.aut.meixner.entity.task.complex.SentenceCreationAndSortingEntity
import hu.aut.meixner.entity.task.complex.SentenceListEntity
import hu.aut.meixner.entity.task.easy.GroupElementEntity
import java.time.OffsetDateTime

//region GroupingAndSorting
fun GroupingAndSortingRequest.toEntity(owner: String, groups: List<GroupElementEntity>): GroupingAndSortingEntity {
    return GroupingAndSortingEntity(
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

fun GroupingAndSortingEntity.toDomainModel(): GroupingAndSortingResponse {
    return GroupingAndSortingResponse(
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
//endregion


//region SentenceCreationAndSorting
fun SentenceCreationAndSortingRequest.toEntity(owner: String): SentenceCreationAndSortingEntity {
    return SentenceCreationAndSortingEntity(
            title = title,
            sentences = sentences.map { it.toEntity() },
            owner = owner,
            difficulty = difficulty,
            subject = subject,
            recommendedMinClass = recommendedMinClass,
            recommendedMaxClass = recommendedMaxClass,
            lastModified = OffsetDateTime.now()
    )
}

fun SentenceCreationAndSortingEntity.toDomainModel(): SentenceCreationAndSortingResponse {
    return SentenceCreationAndSortingResponse(
            id = id,
            title = title,
            sentences = sentences.map { it.toDomainModel() },
            difficulty = difficulty,
            owner = owner,
            subject = subject,
            recommendedMinClass = recommendedMinClass,
            recommendedMaxClass = recommendedMaxClass,
            lastModified = OffsetDateTime.now()
    )
}
//endregion

//region SentenceCreationAndGrouping
fun SentenceCreationAndGroupingRequest.toEntity(owner: String): SentenceCreationAndGroupingEntity {
    return SentenceCreationAndGroupingEntity(
            title = title,
            sentenceGroups = sentenceGroups.map { it.toEntity() },
            owner = owner,
            difficulty = difficulty,
            subject = subject,
            recommendedMinClass = recommendedMinClass,
            recommendedMaxClass = recommendedMaxClass,
            lastModified = OffsetDateTime.now()
    )
}

fun SentenceCreationAndGroupingEntity.toDomainModel(): SentenceCreationAndGroupingResponse {
    return SentenceCreationAndGroupingResponse(
            id = id,
            title = title,
            sentenceGroups = sentenceGroups.map { it.toDomainModel() },
            difficulty = difficulty,
            owner = owner,
            subject = subject,
            recommendedMinClass = recommendedMinClass,
            recommendedMaxClass = recommendedMaxClass,
            lastModified = OffsetDateTime.now()
    )
}

fun SentenceListRequest.toEntity(): SentenceListEntity {
    return SentenceListEntity(
            groupTitle = groupTitle,
            sentences = sentences.map { it.toEntity() }
    )
}

fun SentenceListEntity.toDomainModel(): SentenceListResponse {
    return SentenceListResponse(
            id = id,
            groupTitle = groupTitle,
            sentences = sentences.map { it.toDomainModel() }
    )
}
//endregion
