import styles from "./Card.module.scss"

function card({children, cardClass}) {
  return <div className={`${styles.card} ${cardClass} `}>
    {children}
    </div>;
}

export default card;
