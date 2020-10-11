package hu.aut.meixner.service.result

import hu.aut.meixner.dto.task.common.MediaItemRequest
import hu.aut.meixner.dto.task.common.MediaItemResponse
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