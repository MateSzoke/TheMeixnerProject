package hu.aut.meixner.util.file

import org.springframework.web.multipart.MultipartFile
import java.io.ByteArrayInputStream
import java.io.File
import java.io.FileOutputStream
import java.io.InputStream


/*
*<p>
* Trivial implementation of the {@link MultipartFile} interface to wrap a byte[] decoded
* from a BASE64 encoded String
*</p>
*/
class BASE64MultipartFile(private val imgContent: ByteArray) : MultipartFile {
    override fun getName(): String {
        // TODO - implementation depends on your requirements
        return ""
    }

    override fun getOriginalFilename(): String? {
        // TODO - implementation depends on your requirements
        return null
    }

    override fun getContentType(): String? {
        // TODO - implementation depends on your requirements
        return null
    }

    override fun isEmpty(): Boolean = imgContent.isEmpty()

    override fun getSize(): Long {
        return imgContent.size.toLong()
    }

    override fun getBytes(): ByteArray {
        return imgContent
    }

    override fun getInputStream(): InputStream {
        return ByteArrayInputStream(imgContent)
    }

    override fun transferTo(dest: File) {
        FileOutputStream(dest).write(imgContent)
    }

}