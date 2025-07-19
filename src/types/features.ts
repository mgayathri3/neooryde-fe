export interface IFeature {
  id: number;
  displayName: string;
  featureName: string;
  isActive: boolean;
}

export interface FeaturesResponse extends Response {
  data: {
    features: IFeature[];
  };
}

export interface FeatureFlagsResponse extends Response {
  data: {
    features: string[];
  };
}

export interface FeaturesRequest {
  featureName: string;
}

export interface ModifyFeatureRequest extends FeaturesRequest {
  id: number;
  type: 'status' | 'rename';
  newName?: string;
  isActive?: boolean;
}
