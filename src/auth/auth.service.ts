import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sign } from 'jsonwebtoken';
import { AuthenticateDto } from './dto/authenticate.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from 'src/users/entities/user.entity';
import { IAuthenticate, Role } from './interfaces/user.interface';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async authenticate(authenticateDto: AuthenticateDto): Promise<IAuthenticate> {
    const { userName, password } = authenticateDto;
    const user = await this.userRepository.findOne({ where: { userName, password } });

    if (!user) throw new NotFoundException('Invalid credentials');

    const token = sign({ ...user }, 'secrete');

    return { token, user };
  }

  async register(registerDto: RegisterDto): Promise<IAuthenticate> {
    const { userName, password, role } = registerDto;
    const existingUser = await this.userRepository.findOne({ where: { userName } });

    if (existingUser) throw new ConflictException('Username already taken');

    const newUser = this.userRepository.create({ userName, password, role });
    await this.userRepository.save(newUser);

    const token = sign({ ...newUser }, 'secrete');

    return { token, user: newUser };
  }
}
