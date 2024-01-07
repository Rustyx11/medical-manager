const { describe, it } = require('mocha');

const {
    sendVerificationEmailController,
    verifyEmailController,
  } = require('../controllers/uController'); // podaj właściwą ścieżkę do pliku z kontrolerami
  
  describe('Email Verification Tests', () => {
    const mockUser = {
      _id: 'mockUserId',
      name: 'John Doe',
      email: 'john.doe@example.com',
    };
  
    const mockRequest = {
      query: { id: mockUser._id },
    };
  
    const mockResponse = {
      redirect: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    test('should send verification email', async () => {
      await sendVerificationEmailController(mockUser.name, mockUser.email, mockUser._id);
      expect(mockResponse.send).not.toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.redirect).not.toHaveBeenCalled();
    });
  
    test('should verify email', async () => {
      await verifyEmailController(mockRequest, mockResponse);
      expect(mockResponse.send).toHaveBeenCalledWith({
        success: true,
        message: 'Wszystko w porządku, konto zostało zweryfikowane',
      });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.redirect).toHaveBeenCalledWith('verify');
    });
  
    test('should handle verification error', async () => {
      // Mockowanie funkcji findById, aby zwróciła błąd
      jest.spyOn(userModel, 'findById').mockImplementation(() => {
        throw new Error('Test error');
      });
  
      await verifyEmailController(mockRequest, mockResponse);
      expect(mockResponse.send).toHaveBeenCalledWith({
        success: false,
        message: 'Błąd podczas weryfikacji: Test error',
      });
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.redirect).not.toHaveBeenCalled();
    });
  });
  