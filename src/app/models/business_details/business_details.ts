export class BusinessDetails {
  id: string;
  name: string;
  phone: string;
  invoiceNotes?: string;
  cancelationNotes?: string;
  email: string;
  website: string;
  gst: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  ownerName: string;
  address?: string;
  img: string[];
  qr: string[];
  aboutUs?: string;

  constructor({
    id,
    name,
    phone,
    invoiceNotes,
    cancelationNotes,
    email,
    website,
    gst,
    facebook,
    instagram,
    youtube,
    ownerName,
    address,
    img,
    qr,
    aboutUs,
  }: {
    id: string;
    name: string;
    phone: string;
    invoiceNotes?: string;
    cancelationNotes?: string;
    email: string;
    website: string;
    gst: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
    ownerName: string;
    address?: string;
    img: string[];
    qr: string[];
    aboutUs?: string;
  }) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.invoiceNotes = invoiceNotes;
    this.cancelationNotes = cancelationNotes;
    this.email = email;
    this.website = website;
    this.gst = gst;
    this.facebook = facebook;
    this.instagram = instagram;
    this.youtube = youtube;
    this.ownerName = ownerName;
    this.address = address;
    this.img = img;
    this.qr = qr;
    this.aboutUs = aboutUs;
  }

  static fromMap(map: any): BusinessDetails {
    return new BusinessDetails({
      id: map.id,
      name: map.name,
      phone: map.phone,
      invoiceNotes: map.invoice_notes,
      cancelationNotes: map.cancelation_notes,
      img: Array.isArray(map.img) ? map.img : [],
      email: map.email,
      website: map.website,
      gst: map.gst,
      facebook: map.facebook,
      instagram: map.instagram,
      youtube: map.youtube,
      ownerName: map.owner_name,
      address: map.address,
      qr: Array.isArray(map.qr) ? map.qr : [],
      aboutUs: map.about_us,
    });
  }

  static copy(b: BusinessDetails): BusinessDetails {
    return new BusinessDetails({ ...b });
  }

  static emptyBusinessDetails(): BusinessDetails {
    return new BusinessDetails({
      id: '',
      name: '',
      phone: '',
      invoiceNotes: '',
      cancelationNotes: '',
      img: [],
      email: '',
      website: '',
      gst: '',
      facebook: '',
      instagram: '',
      youtube: '',
      ownerName: '',
      address: '',
      qr: [],
      aboutUs: '',
    });
  }
}
