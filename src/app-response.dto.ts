import { ApiProperty } from '@nestjs/swagger';

export class Gender {
  @ApiProperty()
  value: string;

  @ApiProperty()
  id: string;
}

export class Nationality {
  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;
}

export class User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  gender: Gender;
  @ApiProperty()
  nationality: Nationality;
  @ApiProperty()
  image: string | null;

  @ApiProperty()
  nickname: string;

  @ApiProperty()
  numberOfReviews: string;
}

export class Rating {
  @ApiProperty()
  value: number;
  @ApiProperty()
  safety: number;

  @ApiProperty()
  location: number;

  @ApiProperty()
  staff: number;

  @ApiProperty()
  atmosphere: number;

  @ApiProperty()
  cleanliness: number;

  @ApiProperty()
  facilities: number;

  @ApiProperty()
  overall: number;
}

export class Review {
  @ApiProperty()
  id: string;

  @ApiProperty()
  rating: Rating;

  @ApiProperty()
  user: User;

  @ApiProperty({ format: 'date' })
  date: string;

  @ApiProperty()
  notes: string;

  @ApiProperty()
  isMachineTranslated: boolean;

  @ApiProperty()
  languageCode: string;

  @ApiProperty()
  ownerComment: string | null;

  @ApiProperty()
  liked: boolean;

  @ApiProperty()
  disliked: boolean;

  @ApiProperty()
  recommended: boolean;
}
