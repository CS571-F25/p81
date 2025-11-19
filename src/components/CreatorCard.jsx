import './CreatorCard.css';
export default function CreatorCard(props) {
  return (
    <div>
      <div className='creator-card'>
        <img src={props.src} alt={props.name} className='creator-image' />
        <h2>{props.name}</h2>
        <p>{props.description}</p>
      </div>
    </div>
  );
}
