import {Name} from './name.model';
import {Education} from './education.model';
import {Skill} from './skill.model';

export interface Registration {
  personal: {
    name: Name;
    email: string;
    phone: string;
    education: Education;
    summary: string
  };
  experience: {
    years: number;
    skills: Skill[],
    githubUsername: string;
    summary: string;
  };
  motivation: string;
  preferredOS: string;
}
