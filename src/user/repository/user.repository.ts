// user.repository.ts

import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { getRepository } from 'typeorm';
import { Bill } from 'src/bills/entities/bill.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { Product } from 'src/products/entities/product.entity';

type BillData = {
  id: number;
  payments: Payment[];
  products: Product[];
};

export type UserData = {
  id: number;
  uName: string;
  email: string;
  bills: BillData[];
};

export class UserRepository extends Repository<User> {
  private userRepository: Repository<User>;

  async retrieveAllUserData(): Promise<UserData[]> {
    const users = await this.userRepository.find({
      relations: ['bills', 'bills.payments', 'bills.products'],
    });

    return users.map((user) => {
      return {
        id: user.id,
        uName: user.uName,
        email: user.email,
        bills: user.bills.map((bill) => {
          return {
            id: bill.id,
            payments: bill.payments,
            products: bill.products,
          };
        }),
      };
    });
  }
}
