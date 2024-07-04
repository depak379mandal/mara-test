import { Controller, Get, Headers, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { AppQueryDto } from './app.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Review } from './app-response.dto';

@ApiTags('Reviews')
@Controller('reviews')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({ type: [Review] })
  getReviews(
    @Query() queryDto: AppQueryDto,
    @Headers('auth') auth: string,
  ): Promise<Review[]> {
    return this.appService.getReviews(auth, queryDto);
  }
}
