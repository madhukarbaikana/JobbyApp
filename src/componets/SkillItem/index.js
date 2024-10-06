import './index.css'

const SkillItem = props => {
  const {skillDetails} = props
  const {name, imageUrl} = skillDetails

  return (
    <li className="skill-item-container">
      <img src={imageUrl} alt={name} className="skill-item-image" />
      <h1 className="skill-item-heading">{name}</h1>
    </li>
  )
}

export default SkillItem
