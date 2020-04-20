package hu.aut.meixner.controller.task

import hu.aut.meixner.dto.task.common.MediaItemResponse
import hu.aut.meixner.service.file.FileService
import hu.aut.meixner.service.file.FileService.Companion.DOWNLOAD_FILE_PATH
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@Api(tags = ["Files"], description = "Upload and download files")
@RestController
@RequestMapping("/files")
class FileController(
        private val fileService: FileService
) {

    @PostMapping("/upload")
    @ApiOperation("Test uploading file")
    fun upload(@RequestParam("file") file: MultipartFile): ResponseEntity<MediaItemResponse> {
        return ResponseEntity.ok(fileService.uploadFile(file))
    }

    @GetMapping("/{fileId}")
    @ApiOperation("Test get file")
    fun getFile(@PathVariable("fileId") fileId: Long): ResponseEntity<MediaItemResponse> {
        val file = fileService.getFileById(fileId) ?: return ResponseEntity.notFound().build()
        return ResponseEntity.ok(file)
    }

    @GetMapping("$DOWNLOAD_FILE_PATH/{fileId}")
    @ApiOperation("Test download file")
    fun downloadFile(@PathVariable("fileId") fileId: Long): ResponseEntity<ByteArray> {
        val mediaItem = fileService.getMediaItemEntity(fileId) ?: return ResponseEntity.notFound().build()
        val fileName = "${mediaItem.id}.${mediaItem.fileExtension}"
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(mediaItem.contentType ?: "application/octet-stream"))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"$fileName\"")
                .body(mediaItem.file)
    }

}