package hu.aut.meixner.mapping

import hu.aut.meixner.dto.task.other.*
import hu.aut.meixner.entity.task.MediaItemEntity
import hu.aut.meixner.entity.task.other.*
import java.time.OffsetDateTime

//region BlindMap
fun BlindMapRequest.toEntity(owner: String, image: MediaItemEntity): BlindMapEntity {
    return BlindMapEntity(
            image = image,
            tags = tags.map { it.toEntity() }.toMutableList(),
            title = title,
            difficulty = difficulty,
            owner = owner,
            subject = subject,
            recommendedMinClass = recommendedMinClass,
            recommendedMaxClass = recommendedMaxClass,
            lastModified = OffsetDateTime.now()
    )
}

fun BlindMapEntity.toDomainModel(): BlindMapResponse {
    return BlindMapResponse(
            id = id,
            image = image.toDomainModel(),
            tags = tags.map { it.toDomainModel() },
            lastModified = lastModified,
            difficulty = difficulty,
            title = title,
            owner = owner,
            subject = subject,
            recommendedMinClass = recommendedMinClass,
            recommendedMaxClass = recommendedMaxClass
    )
}

fun BlindMapTag.toEntity(): BlindMapTagEntity {
    return BlindMapTagEntity(
            text = text,
            x = x,
            y = y
    )
}

fun BlindMapTagEntity.toDomainModel(): BlindMapTag {
    return BlindMapTag(
            text = text,
            x = x,
            y = y
    )
}
//endregion

//region Timeline
fun TimelineRequest.toEntity(owner: String): TimelineEntity {
    return TimelineEntity(
            timelineType = timelineType,
            minimumDate = if (timelineType == TimelineType.DATE) minimumDate else null,
            maximumDate = if (timelineType == TimelineType.DATE) maximumDate else null,
            minimumDouble = if (timelineType == TimelineType.DOUBLE) minimumDouble else null,
            maximumDouble = if (timelineType == TimelineType.DOUBLE) maximumDouble else null,
            minimumInt = if (timelineType == TimelineType.INTEGER) minimumInt else null,
            maximumInt = if (timelineType == TimelineType.INTEGER) maximumInt else null,
            tags = timelineTags.map { it.toEntity(timelineType) }.toMutableList(),
            title = title,
            difficulty = difficulty,
            owner = owner,
            subject = subject,
            recommendedMinClass = recommendedMinClass,
            recommendedMaxClass = recommendedMaxClass,
            lastModified = OffsetDateTime.now()
    )
}

fun TimelineEntity.toDomainModel(): TimelineResponse {
    return TimelineResponse(
            id = id,
            timelineType = timelineType,
            minimumDate = minimumDate,
            maximumDate = maximumDate,
            minimumDouble = minimumDouble,
            maximumDouble = maximumDouble,
            minimumInt = minimumInt,
            maximumInt = maximumInt,
            timelineTags = tags.map { it.toDomainModel() },
            lastModified = lastModified,
            difficulty = difficulty,
            title = title,
            owner = owner,
            subject = subject,
            recommendedMinClass = recommendedMinClass,
            recommendedMaxClass = recommendedMaxClass
    )
}

fun TimelineTag.toEntity(timelineType: TimelineType): TimelineTagEntity {
    return TimelineTagEntity(
            name = name,
            valueDate = if (timelineType == TimelineType.DATE) valueDate else null,
            valueDouble = if (timelineType == TimelineType.DOUBLE) valueDouble else null,
            valueInt = if (timelineType == TimelineType.INTEGER) valueInt else null,
            tolerance = tolerance
    )
}

fun TimelineTagEntity.toDomainModel(): TimelineTag {
    return TimelineTag(
            name = name,
            valueDate = valueDate,
            valueDouble = valueDouble,
            valueInt = valueInt,
            tolerance = tolerance
    )
}
//endregion


//region OddOneOut
fun OddOneOutRequest.toEntity(owner: String, options: List<MediaItemEntity>): OddOneOutEntity {
    return OddOneOutEntity(
            correctAnswerIndex = correctAnswerIndex,
            options = options.toMutableList(),
            title = title,
            difficulty = difficulty,
            owner = owner,
            subject = subject,
            recommendedMinClass = recommendedMinClass,
            recommendedMaxClass = recommendedMaxClass,
            lastModified = OffsetDateTime.now()
    )
}

fun OddOneOutEntity.toDomainModel(): OddOneOutResponse {
    return OddOneOutResponse(
            id = id,
            correctAnswerIndex = correctAnswerIndex,
            options = options.map { it.toDomainModel() },
            lastModified = lastModified,
            difficulty = difficulty,
            title = title,
            owner = owner,
            subject = subject,
            recommendedMinClass = recommendedMinClass,
            recommendedMaxClass = recommendedMaxClass
    )
}
//endregion

//region FreeText
fun FreeTextRequest.toEntity(owner: String, question: MediaItemEntity): FreeTextEntity {
    return FreeTextEntity(
            question = question,
            correctAnswer = correctAnswer,
            title = title,
            difficulty = difficulty,
            owner = owner,
            subject = subject,
            recommendedMinClass = recommendedMinClass,
            recommendedMaxClass = recommendedMaxClass,
            lastModified = OffsetDateTime.now()
    )
}

fun FreeTextEntity.toDomainModel(): FreeTextResponse {
    return FreeTextResponse(
            id = id,
            question = question.toDomainModel(),
            correctAnswer = correctAnswer,
            lastModified = lastModified,
            difficulty = difficulty,
            title = title,
            owner = owner,
            subject = subject,
            recommendedMinClass = recommendedMinClass,
            recommendedMaxClass = recommendedMaxClass
    )
}
//endregion

//region Table
fun TableRequest.toEntity(owner: String, table: List<List<MediaItemEntity>>): TableEntity {
    val cols = table.map { rows ->
        TableRowEntity(
                rows = rows.toMutableList()
        )
    }.toMutableList()
    return TableEntity(
            cols = cols,
            title = title,
            difficulty = difficulty,
            owner = owner,
            subject = subject,
            recommendedMinClass = recommendedMinClass,
            recommendedMaxClass = recommendedMaxClass,
            lastModified = OffsetDateTime.now()
    )
}

fun TableEntity.toDomainModel(): TableResponse {
    return TableResponse(
            id = id,
            table = cols.map { tableRowEntity ->
                tableRowEntity.rows.map { mediaItemEntity -> mediaItemEntity.toDomainModel() }
            },
            lastModified = lastModified,
            difficulty = difficulty,
            title = title,
            owner = owner,
            subject = subject,
            recommendedMinClass = recommendedMinClass,
            recommendedMaxClass = recommendedMaxClass
    )
}
//endregion