package hu.aut.meixner.extensions

import hu.aut.meixner.domain.easytask.GroupingEntity
import hu.aut.meixner.domain.easytask.PairingEntity
import hu.aut.meixner.domain.easytask.SentenceCompletionEntity
import hu.aut.meixner.domain.easytask.SortingEntity
import hu.aut.meixner.dto.task.easy.*
import java.time.OffsetDateTime
import hu.aut.meixner.domain.easytask.GroupElementEntity as DBGroup
import hu.aut.meixner.domain.easytask.PairEntity as DBPairElement

//region Pairing
fun PairingRequest.toDBModel(): PairingEntity {
    return PairingEntity(
            pairs = pairs.map { it.toDBModel() },
            title = title,
            difficulty = 0,
            lastModified = OffsetDateTime.now()
    )
}

fun PairElement.toDBModel(): DBPairElement {
    return DBPairElement(
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

fun DBPairElement.toDTOModel(): PairElement {
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

fun Group.toDBModel(): DBGroup {
    return DBGroup(
            name = name,
            elements = elements
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

fun DBGroup.toDTOModel(): Group {
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