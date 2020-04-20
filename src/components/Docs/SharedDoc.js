import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadSharedDoc } from "../../actions/sharedDocs";
import { Editor } from "@tinymce/tinymce-react";

const SharedDoc = ({ loadSharedDoc, docs: { sharedDoc, loading } }) => {
  useEffect(() => {
    const token = window.location.href.split("link/")[1];
    loadSharedDoc(token);
    //eslint-disable-next-line
  }, []);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (sharedDoc) {
      const { content } = sharedDoc;
      setContent(content);
      setTitle(title);
    }
    //eslint-disable-next-line
  }, [sharedDoc]);

  const handleEditorChange = (editor, content) => {};

  if (loading) {
    return <div>Loading...</div>;
  } else {
    var config = {
      docId: sharedDoc.id,
      username: "Another One",
      apiKey: process.env.REACT_APP_WAVE_KEY,
      avatar: { vertical: true },
    };
    return (
      <div>
        <Editor
          apiKey={process.env.REACT_APP_TINY_MCE}
          initialValue={content}
          value={content}
          disabled={sharedDoc.readOnly}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
            external_plugins: {
              wave: "https://cdn2.codox.io/waveTinymce/plugin.min.js",
            },
            wave: config,
          }}
          onEditorChange={handleEditorChange}
        />
      </div>
    );
  }
};

SharedDoc.propTypes = {
  docs: PropTypes.object,
};

const mapStateToProps = (state) => ({
  docs: state.docs,
});

export default connect(mapStateToProps, { loadSharedDoc })(SharedDoc);