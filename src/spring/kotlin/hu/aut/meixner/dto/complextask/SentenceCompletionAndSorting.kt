package hu.aut.meixner.dto.complextask

import hu.aut.meixner.dto.easytask.SentenceCreation
import hu.aut.meixner.dto.easytask.Sorting

class SentenceCompletionAndSorting : Sorting<SentenceCreation>(
        elements = mutableListOf()
)