import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AppQueryDto } from './app.dto';
import axios from 'axios';
import { Review } from './app-response.dto';
import * as dayjs from 'dayjs';

@Injectable()
export class AppService {
  async getReviews(
    auth: string,
    { url, count, fromDate }: AppQueryDto,
  ): Promise<Review[]> {
    if (auth !== 'danimai') {
      throw new UnauthorizedException();
    }

    try {
      const data: Review[] = [];

      let totalLoops = Math.ceil(count / 50);
      const [propertyId] = new URL(url).pathname.split('/').slice(-1);

      for (let loopIndex = 0; loopIndex < totalLoops; loopIndex++) {
        const { data: fetchedData } = await axios.get(
          `https://prod.apigee.hostelworld.com/legacy-hwapi-service/2.2/properties/${propertyId}/reviews/?per-page=${loopIndex < totalLoops - 1 ? 50 : count - loopIndex * 50}&page=${loopIndex + 1}&sort=-date`,
        );

        if (fetchedData.pagination < count) {
          totalLoops = Math.ceil(fetchedData.pagination / 50);
        }

        if (fetchedData.reviews.length > 0) {
          const [lastReview] = fetchedData.reviews.slice(-1);

          if (dayjs(lastReview.date).diff(dayjs(fromDate)) < 0 && fromDate) {
            data.push(
              ...fetchedData.reviews.filter(
                (review) => dayjs(review.date).diff(fromDate) >= 0,
              ),
            );
            break;
          } else {
            data.push(...fetchedData.reviews);
          }
        }
      }

      return data;
    } catch (error) {
      throw new BadRequestException('Inavlid url given.');
    }
  }
}
