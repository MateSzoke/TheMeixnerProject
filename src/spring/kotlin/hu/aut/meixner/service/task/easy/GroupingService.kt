package hu.aut.meixner.service.task.easy

import hu.aut.meixner.dto.task.easy.GroupingRequest
import hu.aut.meixner.dto.task.easy.GroupingResponse
import hu.aut.meixner.extensions.toDBModel
import hu.aut.meixner.extensions.toDTOModel
import hu.aut.meixner.extensions.toNullable
import hu.aut.meixner.repository.task.easytask.GroupingRepository
import org.springframework.stereotype.Service
import java.time.OffsetDateTime

@Service
class GroupingService(
        private val groupingRepository: GroupingRepository
) {

    fun createGrouping(groupingRequest: GroupingRequest): GroupingResponse {
        return groupingRepository.save(groupingRequest.toDBModel()).toDTOModel()
    }

    fun getGroupingById(id: Long): GroupingResponse? {
        return groupingRepository.findById(id).toNullable?.toDTOModel() ?: return null
    }

    fun updateGrouping(id: Long, groupingRequest: GroupingRequest): GroupingResponse? {
        val grouping = groupingRepository.findById(id).toNullable ?: return null
        return groupingRepository.save(
                groupingRequest.run {
                    grouping.copy(
                            title = title,
                            groups = groups.map { it.toDBModel() },
                            lastModified = OffsetDateTime.now()
                    )
                }
        ).toDTOModel()
    }

    fun deleteGrouping(id: Long) {
        val deletedGrouping = groupingRepository.findById(id).toNullable ?: return
        groupingRepository.delete(deletedGrouping)
    }

}