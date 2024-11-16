import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    getName(){
        return "My name is Yonatan Tizazu."
      };
    
      getHobby(){
        return {
          hobby: "I love coding and playing football, and I also enjoy watching action movies and reading books."
        };
      };
    
      getDream(){
        return {
          hobby: `My dream is to harness my skills in software engineering and hardware to create innovative solutions that address real-world challenges, particularly in Africa. I am passionate about blending backend development, machine learning, and cutting-edge technologies like blockchain to build scalable, impactful systems.`
        }
      }
 
}
