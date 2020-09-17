import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    description: 'The email address of the user. It must be unique.',
    required: true,
    example:'daylay863@gmail.com'
  })
  email: string;

  @ApiProperty({
    description: 'The password of the user.',
    example: 'password',
    required: true
  })
  @ApiProperty()
  password: string;
}
