interface CardProps {
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  genre_ids: number[];
  title: string;
}

const Card = ({
  title,
  poster_path,
  overview,
  release_date,
  backdrop_path,
  genre_ids,
}: CardProps) => {
  const imgUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <div
      className='card'
      style={{ backgroundImage: `url(${imgUrl + poster_path})` }}>
      <div className='card-content'>
        <h4 className='card-title'>{title}</h4>
        <h6 className='card-year'>{new Date(release_date).getFullYear()}</h6>
        {/* <p className='card-body'>{overview}</p> */}
      </div>
    </div>
  );
};

export default Card;
