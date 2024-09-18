type Props = {
    classes? : string
  }
  
  function ButtonLoading({classes}: Props) {
    return (
      <div className="flex items-center justify-center">
        <div className={"size-7 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin " + classes}></div>
      </div>
    );
  }
  
  export default ButtonLoading;
  