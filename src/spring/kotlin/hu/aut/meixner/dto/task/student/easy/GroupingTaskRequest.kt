package hu.aut.meixner.dto.task.student.easy

import hu.aut.meixner.dto.task.easy.GroupRequest

class GroupingTaskRequest(
        val attempts: Int,
        val groups: List<GroupRequest>
)