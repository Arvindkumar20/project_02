import { useRef,useState } from 'react';

import Button from './Button';
import './ImageUpload.css';
import { useEffect } from 'react';

const ImageUpload = props => {
  const filePickerRef = useRef();
const [file,setFile]=useState();
const [preViewUrl,setPreViewUrl]=useState();
const [isValid,setIsValid]=useState(false);
useEffect(()=>{
    if(!file){
        return;
        }
        const fileReader=new FileReader();
        fileReader.onload=()=>{
            setPreViewUrl(fileReader.result);
            }

        fileReader.readAsDataURL(file)
},[file])
  const pickedHandler = event => {
    let pickedFile;
    let fileIsValid=isValid;
if( event.target.files && event.target.files.length===1){
     pickedFile = event.target.files[0];
    setFile(pickedFile);
    // setPreViewUrl(URL.createObjectURL(pickedFile));
    setIsValid(true);
    fileIsValid=true;
    }else{
        setIsValid(false);
        }
        props.onInput(props.id,pickedFile,fileIsValid);
}
 

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && 'center'}`}>
        <div className="image-upload__preview">
{preViewUrl && <img src={preViewUrl} alt="Preview" />}
{!preViewUrl && <p>Please Pick an Image</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>PICK IMAGE</Button>
      </div>
      {!isValid && props.errorText}
    </div>
  );
};

export default ImageUpload;
