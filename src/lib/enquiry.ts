import { orderRanges, solutions, type InterestId } from '@/data/commerce';
import { site } from '@/data/site';

interface EnquiryFields {
  brand: string;
  interest: InterestId;
  name?: string;
  message?: string;
  volume?: string;
}

export function buildEnquiry({ brand, interest, name = '', message = '', volume = '' }: EnquiryFields) {
  const cleanBrand = brand.trim().slice(0, 200);
  if (!cleanBrand) throw new Error('Please enter your brand name or website.');
  const cleanName = name.trim().slice(0, 100);
  const cleanMessage = message.trim().slice(0, 600);
  const needsVolume = interest === 'infrastructure' || interest === 'cod-voice' || interest === 'not-sure';
  const validVolume = needsVolume && orderRanges.some(range => range === volume);
  const label = solutions.find(solution => solution.id === interest)?.label || 'Help me choose';

  return [
    'Hi Mehul Labs, I’d like to discuss my D2C setup.',
    '',
    'Brand / website: ' + cleanBrand,
    'Interested in: ' + label,
    ...(validVolume ? ['Daily orders: ' + volume] : []),
    ...(cleanName ? ['Name: ' + cleanName] : []),
    ...(cleanMessage ? ['', cleanMessage] : []),
  ].join('\n');
}

export function getWhatsAppDraftUrl(draft: string) {
  return site.whatsappUrl + '?text=' + encodeURIComponent(draft);
}
