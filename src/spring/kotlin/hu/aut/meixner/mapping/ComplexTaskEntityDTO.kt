package hu.aut.meixner.mapping

import hu.aut.meixner.dto.task.complex.GroupingAndSortingRequest
import hu.aut.meixner.dto.task.complex.GroupingAndSortingResponse
import hu.aut.meixner.entity.task.complex.GroupingAndSortingEntity
import hu.aut.meixner.entity.task.easy.GroupElementEntity
import hu.aut.meixner.entity.task.easy.GroupingEntity
import java.time.OffsetDateTime

//region GroupingAndSorting
fun GroupingAndSortingRequest.toEntity(owner: String, groups: List<GroupElementEntity>): GroupingEntity {
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
