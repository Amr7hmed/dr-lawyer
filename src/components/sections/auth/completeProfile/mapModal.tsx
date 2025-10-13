import "leaflet/dist/leaflet.css";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Map } from "leaflet";
import { LocateFixed } from "lucide-react";
import { useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMapEvents,
  ZoomControl,
} from "react-leaflet";
import { Button } from "../../../ui/button";

import type { ProfileSetupFormData } from "@/schema/auth/profileSetupSchema";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { toast } from "sonner";
import LoadingButton from "@/components/ui/loading-button";
import { useTranslation } from "react-i18next";

const markerIcon = L.icon({
  iconUrl: "/images/marker-icon.png",
  iconRetinaUrl: "/images/marker-icon-2x.png",
  shadowUrl: "/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

async function getAddress(
  lat: number,
  lng: number,
): Promise<{
  addressLine: string;
  city: string;
  country: string;
  postalCode: string;
  address: string;
  countryCode: string;
}> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch address. Status: ${res.status}`);
    }

    const data = await res.json();

    const addr = data.address || {};
    const city = addr.state || addr.city || "";
    const country = addr.country || "";
    const postalCode = addr.postcode || "";
    const countryCode = addr.country_code
      ? addr.country_code.toUpperCase()
      : "";

    const addressLine = data.display_name || "";
    const filteredAddress = postalCode
      ? addressLine
          .split(",")
          .filter((part: string) => part.trim() !== postalCode)
          .join(",")
          .trim()
      : addressLine;

    return {
      addressLine,
      city,
      country,
      postalCode,
      countryCode,
      address: filteredAddress,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    throw new Error("Unable to fetch address information.");
  }
}

export function SearchField() {
  const map = useMap();
  const { t } = useTranslation("profileSetup");

  useEffect(() => {
    if (!map) return;
    const provider = new OpenStreetMapProvider();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const GeoSearch = GeoSearchControl as any;
    const searchControl = new GeoSearch({
      provider,
      style: "bar",
      showMarker: false,
      autoClose: true,
      retainZoomLevel: false,
      searchLabel: t("step3.map.searchPlaceholder"),
    });

    map.addControl(searchControl);

    return () => {
      map.removeControl(searchControl);
    };
  }, [map, t]);

  return null;
}

// 🧭 Reverse geocoding

function ClickToSetMarker({
  onSet,
}: {
  onSet: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onSet(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function MapModal({
  setCity,
}: {
  setCity: (city: string) => void;
}) {
  const [marker, setMarker] = useState<[number, number] | null>(null);
  const [address, setAddress] = useState("");
  const [center, setCenter] = useState<[number, number]>([25.2048, 55.2708]);
  const [loading, setLoading] = useState(false);
  const [fullAddress, setFullAddress] = useState<{
    address: string;
    city: string;
    country: string;
    postalCode: string;
    countryCode: string;
  } | null>(null);

  const { setValue } = useFormContext<ProfileSetupFormData>();
  const { t } = useTranslation("profileSetup");

  const mapRef = useRef<Map | null>(null);

  // 📍 Detect user location
  const detectLocation = () => {
    if (!navigator.geolocation) {
      toast.warning(t("step3.map.noGeo"));
      return;
    }

    // Check if the user has blocked location access
    navigator.permissions
      .query({ name: "geolocation" })
      .then((permissionStatus) => {
        if (permissionStatus.state === "denied") {
          toast.warning(t("step3.map.denied"));
          return;
        }

        // Either granted or prompt: Try to get location
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;

            setMarker([lat, lng]);
            setCenter([lat, lng]);

            try {
              setLoading(true);
              const addr = await getAddress(lat, lng);
              const { addressLine, ...rest } = addr;
              setAddress(addressLine);
              setFullAddress(rest);
              setLoading(false);
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
              toast.error(t("step3.map.fetchError"));
              setLoading(false);
            }

            if (mapRef.current) {
              mapRef.current.setView([lat, lng], 16);
            }
          },
          (err) => {
            if (err.code === 1) {
              toast.error(t("step3.map.denied"));
            } else if (err.code === 2) {
              toast.error(t("step3.map.unAvailable"));
            } else if (err.code === 3) {
              toast.error(t("step3.map.timeOut"));
            } else {
              toast.error(t("step3.map.failed"));
            }
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          },
        );
      })
      .catch(() => {
        // Permissions API not supported or fails — fallback
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;

            setMarker([lat, lng]);
            setCenter([lat, lng]);

            try {
              setLoading(true);
              const addr = await getAddress(lat, lng);
              const { addressLine, ...rest } = addr;
              setAddress(addressLine);
              setFullAddress(rest);
              setLoading(false);
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
              toast.error(t("step3.map.fetchError"));
              setLoading(false);
            }

            if (mapRef.current) {
              mapRef.current.setView([lat, lng], 16);
            }
          },
          () => {
            toast.error(t("step3.map.noDetect"));
          },
        );
      });
  };

  const handleSetMarker = async (lat: number, lng: number) => {
    setMarker([lat, lng]);

    try {
      setLoading(true);
      const addr = await getAddress(lat, lng);
      const { addressLine, ...rest } = addr;
      setAddress(addressLine);
      setFullAddress(rest);
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error(t("step3.map.failedMarker"));
      setLoading(false);
    }
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        setFullAddress(null);
        setAddress("");
        setMarker(null);
        if (open && navigator.geolocation) detectLocation();
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant={"secondary"}
          type="button"
          size={"lg"}
          className="text-muted-foreground w-full rounded-4xl py-3"
        >
          {t("step3.mapSelect")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{t("step3.map.title")}</DialogTitle>
          <DialogDescription>{t("step3.map.description")}</DialogDescription>
        </DialogHeader>

        <div className="relative z-0 h-[400px] overflow-hidden rounded">
          <MapContainer
            center={center}
            ref={mapRef}
            zoom={13}
            zoomControl={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright" target="_blank" rel="noopener noreferrer">OSM</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <SearchField />
            <ClickToSetMarker onSet={handleSetMarker} />
            {marker && <Marker position={marker} icon={markerIcon} />}
            <ZoomControl position="bottomright" />
          </MapContainer>

          {/* 📍 Floating My Location Button */}
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={detectLocation}
            className="absolute right-[10px] bottom-[89px] z-[999] flex h-[33px] w-[33px] items-center justify-center rounded border-2 border-zinc-400/90 bg-white shadow-md hover:bg-gray-100"
            title={t("step3.map.myLocation")}
          >
            <LocateFixed />
          </Button>
        </div>

        {marker && (
          <div className="bg-secondary mt-4 space-y-1 rounded border p-3 text-sm">
            <p>{address ? address : loading ? t("step3.map.loading") : ""}</p>
          </div>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="rounded-4xl"
            >
              {t("step3.map.cancel")}
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <LoadingButton
              disabled={!marker}
              loading={loading}
              type="button"
              size={"lg"}
              className="rounded-4xl"
              onClick={() => {
                if (marker && fullAddress) {
                  setValue("country", fullAddress.country);
                  // setValue("city", fullAddress.city);
                  setCity(fullAddress.city);
                  setValue("address", fullAddress.address);
                  setValue("postalCode", fullAddress.postalCode);
                  setValue("countryCode", fullAddress.countryCode);
                }
              }}
            >
              {t("step3.map.save")}
            </LoadingButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
