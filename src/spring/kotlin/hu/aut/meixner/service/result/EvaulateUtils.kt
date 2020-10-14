package hu.aut.meixner.service.result

import hu.aut.meixner.dto.task.common.MediaItemRequest
import hu.aut.meixner.dto.task.common.MediaItemResponse
import hu.aut.meixner.dto.task.common.TaskResponse
import hu.aut.meixner.dto.task.common.TaskTypeEnum.*
import hu.aut.meixner.dto.task.easy.*
import hu.aut.meixner.dto.task.student.easy.*
import hu.aut.meixner.mapping.toDomainModel

fun List<MediaItemRequest>.compareResultMediaItems(resultMediaItems: List<MediaItemResponse>): Double {
    var match = 0
    val requestMediaItems = map { it.toDomainModel() }
    resultMediaItems.forEach { resultMediaItem ->
        if (requestMediaItems.contains(resultMediaItem)) match++
    }
    return if (size <= resultMediaItems.size) match / size.toDouble() else match / resultMediaItems.size.toDouble()
}

fun List<MediaItemRequest>.compareSortedResultMediaItems(resultMediaItems: List<MediaItemResponse>): Double {
    var match = 0
    zip(resultMediaItems).forEach { (requestMediaItem, resultMediaItem) ->
        if (requestMediaItem.toDomainModel() == resultMediaItem) match++
    }
    return if (size <= resultMediaItems.size) match / size.toDouble() else match / resultMediaItems.size.toDouble()
}

fun List<MediaItemRequest>.equalsResultMediaItems(resultMediaItems: List<MediaItemResponse>): Boolean {
    return map { it.toDomainModel() }.sortedBy { it.hashCode() } == resultMediaItems.sortedBy { it.hashCode() }
}

fun List<MediaItemRequest>.equalsSortedResultMediaItems(resultMediaItems: List<MediaItemResponse>): Boolean {
    return map { it.toDomainModel() } == resultMediaItems
}

fun TaskResponse.toAssignTask(): AssignTask? {
    return when (type) {
        Grouping -> {
            val task = this as? GroupingResponse ?: return null
            GroupingTask(
                    taskId = id,
                    title = title,
                    groups = task.groups.map { it.name },
                    elements = task.groups.flatMap { it.elements }.shuffled()
            )
        }
        Pairing -> {
            val task = this as? PairingResponse ?: return null
            PairingTask(
                    taskId = id,
                    title = title,
                    elements = task.pairs.flatMap { it.pair }.shuffled()
            )
        }
        SentenceCompletion -> {
            val task = this as? SentenceCompletionResponse ?: return null
            SentenceCompletionTask(
                    taskId = id,
                    title = title,
                    sentence = task.sentence,
                    options = task.options.shuffled()
            )
        }
        SentenceCreation -> {
            val task = this as? SentenceCreationResponse ?: return null
            SentenceCreationTask(
                    taskId = id,
                    title = title,
                    sentenceTitles = task.sentences.map { it.sentenceTitle },
                    parts = task.sentences.flatMap { it.parts }.shuffled()
            )
        }
        Sorting -> {
            val task = this as? SortingResponse ?: return null
            SortingTask(
                    taskId = id,
                    title = title,
                    elements = task.elements.shuffled()
            )
        }
        TrueFalse -> {
            val task = this as? TrueFalseResponse ?: return null
            TrueFalseTask(
                    taskId = id,
                    title = title,
                    elements = (task.trueItems + task.falseItems).shuffled()
            )
        }
        MemoryGame -> {
            val task = this as? MemoryGameResponse ?: return null
            MemoryGameTask(
                    taskId = id,
                    title = title,
                    elements = task.pairs.flatMap { it.pair }.shuffled()
            )
        }
        GroupingAndSorting -> TODO()
        SentenceCompletionAndGrouping -> TODO()
        SentenceCompletionAndSorting -> TODO()
        SentenceCreationAndGrouping -> TODO()
        SentenceCreationAndSorting -> TODO()
        SortingAndGrouping -> TODO()
        BlindMap -> TODO()
        FreeText -> TODO()
        OddOneOut -> TODO()
        TimeLine -> TODO()
        Table -> TODO()
    }
}