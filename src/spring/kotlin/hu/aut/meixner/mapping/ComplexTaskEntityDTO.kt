package hu.aut.meixner.mapping

import hu.aut.meixner.dto.task.complex.*
import hu.aut.meixner.entity.task.complex.*
import hu.aut.meixner.entity.task.easy.GroupElementEntity
import hu.aut.meixner.entity.task.easy.SentenceEntity
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

fun SentenceCreationList.toEntity(): SentenceListEntity {
    return SentenceListEntity(
            groupTitle = groupTitle,
            sentences = sentences.map { it.toEntity() }
    )
}

fun SentenceListEntity.toDomainModel(): SentenceCreationList {
    return SentenceCreationList(
            groupTitle = groupTitle,
            sentences = sentences.map { it.toDomainModel() }
    )
}
//endregion

//region SentenceCompletionAndSorting
fun SentenceCompletionAndSortingRequest.toEntity(owner: String): SentenceCompletionAndSortingEntity {
    return SentenceCompletionAndSortingEntity(
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

fun SentenceCompletionAndSortingEntity.toDomainModel(): SentenceCompletionAndSortingResponse {
    return SentenceCompletionAndSortingResponse(
            id = id,
            title = title,
            sentences = sentences.map { it.toSentenceCompletionItem() },
            difficulty = difficulty,
            owner = owner,
            subject = subject,
            recommendedMinClass = recommendedMinClass,
            recommendedMaxClass = recommendedMaxClass,
            lastModified = OffsetDateTime.now()
    )
}

fun SentenceCompletionItem.toEntity(): SentenceEntity {
    return SentenceEntity(
            sentenceTitle = sentence,
            parts = options.toMutableList()
    )
}

fun SentenceEntity.toSentenceCompletionItem(): SentenceCompletionItem {
    return SentenceCompletionItem(
            sentence = sentenceTitle,
            options = parts
    )
}
//endregion

//region SentenceCreationAndGrouping
fun SentenceCompletionAndGroupingRequest.toEntity(owner: String): SentenceCompletionAndGroupingEntity {
    return SentenceCompletionAndGroupingEntity(
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

fun SentenceCompletionAndGroupingEntity.toDomainModel(): SentenceCompletionAndGroupingResponse {
    return SentenceCompletionAndGroupingResponse(
            id = id,
            title = title,
            sentenceGroups = sentenceGroups.map { it.toSentenceCompletionList() },
            difficulty = difficulty,
            owner = owner,
            subject = subject,
            recommendedMinClass = recommendedMinClass,
            recommendedMaxClass = recommendedMaxClass,
            lastModified = OffsetDateTime.now()
    )
}

fun SentenceCompletionList.toEntity(): SentenceListEntity {
    return SentenceListEntity(
            groupTitle = groupTitle,
            sentences = sentences.map { it.toEntity() }
    )
}

fun SentenceListEntity.toSentenceCompletionList(): SentenceCompletionList {
    return SentenceCompletionList(
            groupTitle = groupTitle,
            sentences = sentences.map { it.toDomainModel() }
    )
}
//endregion

//region SortingAndGrouping
fun SortingAndGroupingRequest.toEntity(owner: String, groups: List<GroupElementEntity>): SortingAndGroupingEntity {
    return SortingAndGroupingEntity(
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

fun SortingAndGroupingEntity.toDomainModel(): SortingAndGroupingResponse {
    return SortingAndGroupingResponse(
            id = id,
            lastModified = lastModified,
            difficulty = difficulty,
            title = title,
            owner = owner,
            subject = subject,
            recommendedMinClass = recommendedMinClass,
            recommendedMaxClass = recommendedMaxClass,
            groups = groups.map { it.toGroupListItem() }
    )
}

fun GroupElementEntity.toGroupListItem(): GroupListItemResponse {
    return GroupListItemResponse(
            elements = elements.map { it.toDomainModel() }
    )
}
//endregion