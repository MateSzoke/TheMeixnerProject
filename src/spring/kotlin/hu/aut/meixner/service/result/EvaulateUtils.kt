package hu.aut.meixner.service.result

import hu.aut.meixner.dto.task.common.MediaItemRequest
import hu.aut.meixner.dto.task.common.MediaItemResponse
import hu.aut.meixner.dto.task.common.TaskResponse
import hu.aut.meixner.dto.task.common.TaskTypeEnum.*
import hu.aut.meixner.dto.task.easy.*
import hu.aut.meixner.dto.task.student.easy.*
import hu.aut.meixner.mapping.getSentenceTask
import hu.aut.meixner.mapping.toDomainModel

fun List<MediaItemResponse>.compareResultMediaItems(requestMediaItems: List<MediaItemRequest>): Boolean {
    if (requestMediaItems.isEmpty()) return false
    requestMediaItems.forEach { requestMediaItem ->
        if (!contains(requestMediaItem.toDomainModel())) {
            return false
        }
    }
    return true
}

fun List<MediaItemResponse>.compareSortedResultMediaItems(requestMediaItems: List<MediaItemRequest>): List<Boolean> {
    val currentResult = mutableListOf<Boolean>()
    zip(requestMediaItems).forEach { (requestMediaItem, resultMediaItem) ->
        currentResult.add(requestMediaItem == resultMediaItem.toDomainModel())
    }
    return currentResult
}

fun List<MediaItemResponse>.equalsResultMediaItems(requestMediaItems: List<MediaItemRequest>): Boolean {
    return sortedBy { it.hashCode() } == requestMediaItems.map { it.toDomainModel() }.sortedBy { it.hashCode() }
}

fun List<MediaItemResponse>.equalsSortedResultMediaItems(requestMediaItems: List<MediaItemRequest>): Boolean {
    return this == requestMediaItems.map { it.toDomainModel() }
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
                    sentence = task.getSentenceTask(),
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