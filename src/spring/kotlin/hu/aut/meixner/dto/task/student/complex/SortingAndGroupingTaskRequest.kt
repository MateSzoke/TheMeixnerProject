package hu.aut.meixner.dto.task.student.complex

import hu.aut.meixner.dto.task.complex.GroupListItemRequest

class SortingAndGroupingTaskRequest(
        val attempts: Int,
        val groups: List<GroupListItemRequest>
)