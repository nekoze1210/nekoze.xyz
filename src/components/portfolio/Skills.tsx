'use client'
import { FC } from 'react'

import Tile from '@/components/portfolio/Tile'
import TileItem from '@/components/portfolio/TileItem'
import TileItemHeading from '@/components/portfolio/TileItemHeading'
import TileItemText from '@/components/portfolio/TileItemText'
import TileTitle from '@/components/portfolio/TileTitle'

const Skills: FC = () => {
  const skills = [
    {
      category: 'Front-end skills',
      description: 'HTML/CSS/JavaScript, TypeScript, React, React Native, Next.js, Vue',
    },
    {
      category: 'Back-end skills',
      description: 'Golang, TypeScript, Python, Node.js, Ruby',
    },
    {
      category: 'Tools, Service',
      description: 'GCP, AWS, OpenAI, v0, Vercel, GitHub, Docker, Notion, Helpfeel Cosense',
    },
  ]
  return (
    <>
      <Tile>
        <TileTitle title={'Skills'} />
        {skills.map((skill, index) => (
          <TileItem key={index}>
            <TileItemHeading>{skill.category}</TileItemHeading>
            <TileItemText>{skill.description}</TileItemText>
          </TileItem>
        ))}
      </Tile>
    </>
  )
}

export default Skills
