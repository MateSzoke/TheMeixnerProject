package hu.aut.meixner.controller.task

import hu.aut.meixner.dto.task.common.MediaItemResponse
import hu.aut.meixner.service.file.MediaItemService
import hu.aut.meixner.service.file.MediaItemService.Companion.DOWNLOAD_FILE_PATH
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
        private val mediaItemService: MediaItemService
) {

    @PostMapping("/upload")
    @ApiOperation("You can upload file here")
    fun upload(@RequestParam("file") file: MultipartFile): ResponseEntity<MediaItemResponse> {
        return ResponseEntity.ok(mediaItemService.uploadFile(file))
    }

    @GetMapping("$DOWNLOAD_FILE_PATH/{fileId}")
    @ApiOperation("Download file by fileId")
    fun downloadFile(@PathVariable("fileId") fileId: Long): ResponseEntity<ByteArray> {
        val mediaItem = mediaItemService.getMediaItemEntity(fileId) ?: return ResponseEntity.notFound().build()
        val fileName = "${mediaItem.id}.${mediaItem.fileExtension}"
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(mediaItem.contentType ?: "application/octet-stream"))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"$fileName\"")
                .body(mediaItem.file)
    }

}