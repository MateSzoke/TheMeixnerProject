package hu.aut.meixner.dto

class Timeline(
        val type: TimelineType,
        val minimum: String,
        val maximum: String,
        val timelineTags: MutableList<TimelineTag>
) : Task()