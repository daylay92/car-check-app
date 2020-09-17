import { ApiProperty } from '@nestjs/swagger';

export class CreateNewUserDto {
  @ApiProperty({
    description: 'The email address of the user. It must be unique.',
    required: true,
    example: 'daylay863@gmail.com'
  })
  email: string;

  @ApiProperty({
    description: 'The password of the user.',
    example: 'password',
    required: true
  })
  @ApiProperty()
  password: string;

  @ApiProperty({
    description: 'The first name the user.',
    example: 'Ayodele',
    required: true
  })
  @ApiProperty()
  firstName: string;

  @ApiProperty({
    description: 'The last name the user.',
    example: 'King',
    required: true
  })
  @ApiProperty()
  lastName: string;
}
