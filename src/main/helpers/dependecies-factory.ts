import { IBarberAvailabilityService } from "@/application/interfaces/services/barber-availability-service.interface";
import { BarberAvailabilityService } from "@/application/services/barber-availability.service";
import { IAppointmentRepository } from "@/infra/interfaces/repositories/appointment-repository.interface";
import { IBarberRepository } from "@/infra/interfaces/repositories/barber-repository.interface";
import { ICustomerRepository } from "@/infra/interfaces/repositories/customer-repository.interface";
import { IServiceRepository } from "@/infra/interfaces/repositories/service-repository.interface";
import { IMailService } from "@/infra/interfaces/services/mail-service.interface";
import { InMemoryAppointmentRepository } from "@/infra/repositories/in-memory/in-memory-appointment.repository";
import { InMemoryBarberRepository } from "@/infra/repositories/in-memory/in-memory-barber.repository";
import { InMemoryCustomerRepository } from "@/infra/repositories/in-memory/in-memory-customer.repository";
import { InMemoryServiceRepository } from "@/infra/repositories/in-memory/in-memory-service.repository";
import { MailService } from "@/infra/services/mail.service";

export interface IDependenciesFactory {
  repos: {
    appointmentRepo: IAppointmentRepository;
    barberRepo: IBarberRepository;
    serviceRepo: IServiceRepository;
    customerRepo: ICustomerRepository;
  };
  services: {
    barberAvailabilityService: IBarberAvailabilityService;
    mailService: IMailService;
  };
}

export function DependenciesFactory(): IDependenciesFactory {
  const appointmentRepo = new InMemoryAppointmentRepository();
  const barberRepo = new InMemoryBarberRepository();
  const serviceRepo = new InMemoryServiceRepository();
  const customerRepo = new InMemoryCustomerRepository();
  const barberAvailabilityService = new BarberAvailabilityService(
    barberRepo,
    appointmentRepo
  );
  const mailService = new MailService();

  return {
    repos: {
      appointmentRepo,
      barberRepo,
      serviceRepo,
      customerRepo,
    },
    services: {
      barberAvailabilityService,
      mailService,
    },
  };
}
