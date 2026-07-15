import { submitContact } from '@/lib/contact';

describe('submitContact', () => {
  it('posts to the local contact API route', async () => {
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({ ok: true } as Response);

    await submitContact({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      message: 'Hello from the test suite'
    });

    expect(fetchMock).toHaveBeenCalledWith(
      '/api/contact',
      expect.objectContaining({ method: 'POST' })
    );

    fetchMock.mockRestore();
  });
});
