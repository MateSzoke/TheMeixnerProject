package hu.aut.meixner.dto.task.student.complex

import hu.aut.meixner.dto.task.easy.GroupRequest

class GroupingAndSortingTaskRequest(
        val attempts: Int,
        val groups: List<GroupRequest>
)