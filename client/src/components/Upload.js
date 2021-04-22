import ajax from 'superagent';
import React from 'react';
import { Form } from 'react-bootstrap';

// any single character or more followed by valid file ext
const PHOTO_REGEX = '.+\\.(?:jpg|jpeg|gif|png)$';

export const Upload = ({
  selectedFile,
  previewSource,
  setSelectedFile,
  setPreviewSource,
}) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file.name);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    // convert image to URL
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Message to user, "No file selected"
    if (!previewSource) return;
    uploadImage(previewSource);
  };

  const uploadImage = async (base64encodedImage) => {
    console.log('base64encodedImage', base64encodedImage);
    try {
      const res = await ajax
        .post('/api/upload')
        .send({ data: base64encodedImage })
        .set('accept', 'json');
      console.log('res', res);
      return res.body;
      // TODO: Success alert
    } catch (error) {
      // TODO: Error alert
      console.error(error);
    }
  };

  const isInvalidFileType = () => {
    if (selectedFile) {
      return !selectedFile.match(PHOTO_REGEX);
    }
    return false;
  };

  return (
    <Form.File id="file-upload" custom>
      <Form.File.Input onChange={handleFileChange} />
      <Form.File.Label data-browse="Browse">{selectedFile}</Form.File.Label>
      <Form.Control.Feedback type="invalid">
        Must be a valid image file (jpg,jpeg,gif,png)
      </Form.Control.Feedback>
    </Form.File>
  );
};
