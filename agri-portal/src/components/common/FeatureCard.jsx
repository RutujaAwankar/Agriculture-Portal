const FeaturedCard = (props) => {
    return (
    <>
        <h2 className={`text-3xl mb-6`}>{props.title}</h2>
        <h5 className="hover:cursor-pointer">{props.subtitle}</h5>
    </>
    );
  };
  
  export default FeaturedCard;