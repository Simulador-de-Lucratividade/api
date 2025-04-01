import { Request, Response } from "express";
import { container } from "tsyringe";
import { EditCustomerUseCase } from "./EditCustomerUseCase";

class EditCustomerController {
  async handle(request: Request, response: Response): Promise<void> {
    const { email, name, phone, address, city, state, zip_code, country } =
      request.body;
    const { id } = request.params;

    try {
      const editCustomerUseCase = container.resolve(EditCustomerUseCase);
      const customer = await editCustomerUseCase.execute({
        id,
        email,
        name,
        phone,
        address,
        city,
        state,
        zip_code,
        country,
      });

      response.status(200).json({ success: true, customer });
    } catch (error) {
      if (error instanceof Error) {
        response.status(400).json({ success: false, message: error.message });
      } else {
        response
          .status(400)
          .json({ success: false, message: "Erro desconhecido" });
      }
    }
  }
}

export default EditCustomerController;
