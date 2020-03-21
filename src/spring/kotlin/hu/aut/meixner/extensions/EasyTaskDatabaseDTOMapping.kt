package hu.aut.meixner.extensions

import hu.aut.meixner.domain.easytask.Grouping
import hu.aut.meixner.domain.easytask.Pairing
import hu.aut.meixner.domain.easytask.SentenceCompletion
import hu.aut.meixner.dto.task.easy.*
import java.time.OffsetDateTime
import hu.aut.meixner.domain.easytask.Group as DBGroup
import hu.aut.meixner.domain.easytask.PairElement as DBPairElement

//region Pairing
fun PairingRequest.toDBModel(): Pairing {
    return Pairing(
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

fun Pairing.toDTOModel(): PairingResponse {
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
fun GroupingRequest.toDBModel(): Grouping {
    return Grouping(
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

fun Grouping.toDTOModel(): GroupingResponse {
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
fun SentenceCompletionRequest.toDBModel(): SentenceCompletion {
    return SentenceCompletion(
            title = title,
            sentence = sentence,
            options = options,
            difficulty = 0,
            lastModified = OffsetDateTime.now()
    )
}

fun SentenceCompletion.toDTOModel(): SentenceCompletionResponse {
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