import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Restaurant } from "./ entities/restaurant.entity";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";

@Resolver(of => Restaurant)
export class RestaurantResolver {
    @Query(returns => [Restaurant])
    restaurants(@Args('veganOnly') veganOnly: boolean): Restaurant[] {
        return [];
    }
    
    @Mutation(returns => Boolean)
    createRestaurant(
        @Args() CreateRestaurantDto: CreateRestaurantDto
    ): boolean {
        return true;
    }
}