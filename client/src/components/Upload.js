import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

// any single character or more followed by valid file ext (ignore case)
const PHOTO_REGEX = '.+\\.(?:jpg|JPG|jpeg|JPEG|gif|GIF|png|PNG)$';

export const Upload = ({ selectedFile, setSelectedFile, setPreviewSource }) => {
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

  const isInvalidFileType = () => {
    return !selectedFile.match(new RegExp(PHOTO_REGEX));
  };

  return (
    <>
      <InputGroup>
        <Form.Control
          data-browse="Browse"
          defaultValue={selectedFile}
          pattern={PHOTO_REGEX}
        />
        <InputGroup.Append>
          <InputGroup.Text>Browse</InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
      <Form.File id="file-upload" custom>
        <Form.File.Input
          onChange={handleFileChange}
          isInvalid={selectedFile && isInvalidFileType()}
          style={{
            position: 'absolute',
            top: -38,
            cursor: 'pointer',
          }}
        />
        <Form.Control.Feedback type="invalid">
          Must be a valid image file (jpg, jpeg, gif, png)
        </Form.Control.Feedback>
      </Form.File>
    </>
  );
};
