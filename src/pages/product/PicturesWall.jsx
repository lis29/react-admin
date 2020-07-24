import React from 'react'
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
  };

  getImgs = () => {
    return this.state.fileList.map(file => file.name)
  }
  handleChange = info => {
    let { fileList, file: currentFile } = info;
    console.log(currentFile)
    if (currentFile.status === "done") {
      let lastFile = fileList[fileList.length - 1]
      if (lastFile.response && lastFile.response.status === 0) {
        message.success('上传图片成功')
        lastFile.url = lastFile.response.data.url;
        lastFile.name = lastFile.response.data.name
      } else {
        message.success("上传图片失败")
      }
    } else if ("removed" === currentFile.status) {
      console.log("删除图片中。。。")
    }

    this.setState({ fileList });
  };

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleCancel = () => {
    this.setState({
      previewVisible: false
    })
  }

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const props = {
      action: '/manage/img/upload',
      accept: 'image/*',
      name: 'image',
      listType: 'picture-card',
      onChange: this.handleChange,
      onPreview: this.handlePreview,
      multiple: false,
      fileList: fileList
    };

    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
        <Upload {...props} fileList={this.state.fileList}>
          {uploadButton}
        </Upload>

        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>

    );
  }
}

export default PicturesWall;